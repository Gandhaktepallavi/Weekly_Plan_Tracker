using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeeklyPlanController : ControllerBase
    {
        private readonly WeeklyPlannerDbContext _context;

        public WeeklyPlanController(WeeklyPlannerDbContext context)
        {
            _context = context;
        }

        // GET: api/weeklyplan/current
        [HttpGet("current")]
        public async Task<ActionResult<WeeklyPlan>> GetCurrentWeeklyPlan()
        {
            var tuesday = GetPlanningWeekTuesday(DateTime.Today);

            var plan = await _context.WeeklyPlans
                .Include(w => w.TaskAssignments)
                .FirstOrDefaultAsync(p => p.WeekStart.Date == tuesday.Date);

            if (plan == null)
            {
                // Return a new empty plan
                return new WeeklyPlan 
                { 
                    WeekStart = tuesday,
                    WeekEnd = tuesday.AddDays(6), // Monday
                    IsFrozen = false,
                    ClientPercent = 0,
                    TechDebtPercent = 0,
                    RndPercent = 0,
                    SelectedMemberIds = new List<string>()
                };
            }

            return plan;
        }

        // GET: api/weeklyplan/active
        [HttpGet("active")]
        public async Task<IActionResult> GetActivePlan()
        {
            var tuesday = GetPlanningWeekTuesday(DateTime.Today);

            var plan = await _context.WeeklyPlans
                .FirstOrDefaultAsync(p => p.WeekStart.Date == tuesday.Date && !p.IsFrozen);

            return Ok(plan != null);
        }

        // GET: api/weeklyplan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeeklyPlan>>> GetAllWeeklyPlans()
        {
            var plans = await _context.WeeklyPlans
                .OrderByDescending(p => p.WeekStart)
                .ToListAsync();
            return Ok(plans);
        }

        // GET: api/weeklyplan/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<WeeklyPlan>> GetWeeklyPlan(string id)
        {
            var plan = await _context.WeeklyPlans
                .Include(w => w.TaskAssignments)
                .ThenInclude(t => t.TeamMember)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (plan == null)
            {
                return NotFound();
            }

            return plan;
        }

        // POST: api/weeklyplan
        [HttpPost]
        public async Task<ActionResult<WeeklyPlan>> CreateWeeklyPlan(WeeklyPlan plan)
        {
            plan.Id = Guid.NewGuid().ToString();
            plan.WeekStart = GetPlanningWeekTuesday(plan.WeekStart);
            plan.WeekEnd = plan.WeekStart.AddDays(6); // Monday
            plan.SelectedMemberIds ??= new List<string>();

            var existing = await _context.WeeklyPlans
                .FirstOrDefaultAsync(p => p.WeekStart.Date == plan.WeekStart.Date);

            if (existing is not null)
            {
                return Conflict("A weekly plan already exists for this planning week.");
            }

            _context.WeeklyPlans.Add(plan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurrentWeeklyPlan), new { id = plan.Id }, plan);
        }

        // PUT: api/weeklyplan/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWeeklyPlan(string id, WeeklyPlan plan)
        {
            if (!string.IsNullOrWhiteSpace(plan.Id) && id != plan.Id)
            {
                return BadRequest();
            }

            var existing = await _context.WeeklyPlans
                .Include(w => w.TaskAssignments)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (existing is null)
            {
                return NotFound();
            }

            if (existing.IsFrozen)
            {
                return BadRequest("Frozen plans cannot be edited.");
            }

            existing.WeekStart = GetPlanningWeekTuesday(plan.WeekStart);
            existing.WeekEnd = existing.WeekStart.AddDays(6);
            existing.ClientPercent = plan.ClientPercent;
            existing.TechDebtPercent = plan.TechDebtPercent;
            existing.RndPercent = plan.RndPercent;
            existing.SelectedMemberIds = plan.SelectedMemberIds ?? new List<string>();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeeklyPlanExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // POST: api/weeklyplan/{id}/freeze
        [HttpPost("{id}/freeze")]
        public async Task<IActionResult> Freeze(string id)
        {
            var plan = await _context.WeeklyPlans
                .Include(w => w.TaskAssignments)
                .ThenInclude(t => t.BacklogItem)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (plan == null)
            {
                return NotFound();
            }

            // Validation: selected members must each have exactly 30 planned hours
            var memberHours = plan.SelectedMemberIds
                .Select(memberId => new
                {
                    MemberId = memberId,
                    Hours = plan.TaskAssignments
                        .Where(t => t.TeamMemberId == memberId)
                        .Sum(t => t.AssignedHours)
                })
                .ToList();

            var invalidHours = memberHours.Where(m => m.Hours != 30).ToList();
            if (invalidHours.Any())
            {
                return BadRequest("Cannot freeze: Every selected member must have exactly 30 planned hours. " +
                    string.Join(", ", invalidHours.Select(m => $"{m.MemberId}: {m.Hours}h")));
            }

            // Validate category percentages
            if (plan.ClientPercent + plan.TechDebtPercent + plan.RndPercent != 100)
            {
                return BadRequest("Category percentages must add up to 100%");
            }

            var totalHours = plan.TaskAssignments.Sum(t => t.AssignedHours);
            var expectedCategoryHours = new Dictionary<Category, int>
            {
                [Category.Client] = (int)Math.Round(totalHours * (plan.ClientPercent / 100.0), MidpointRounding.AwayFromZero),
                [Category.TechDebt] = (int)Math.Round(totalHours * (plan.TechDebtPercent / 100.0), MidpointRounding.AwayFromZero),
                [Category.RnD] = (int)Math.Round(totalHours * (plan.RndPercent / 100.0), MidpointRounding.AwayFromZero)
            };

            var actualCategoryHours = plan.TaskAssignments
                .Where(t => t.BacklogItem is not null)
                .GroupBy(t => t.BacklogItem!.Category)
                .ToDictionary(g => g.Key, g => g.Sum(t => t.AssignedHours));

            var categoryViolations = expectedCategoryHours
                .Where(expected =>
                {
                    var actual = actualCategoryHours.GetValueOrDefault(expected.Key, 0);
                    return actual != expected.Value;
                })
                .Select(expected =>
                {
                    var actual = actualCategoryHours.GetValueOrDefault(expected.Key, 0);
                    return $"{expected.Key}: {actual}h/{expected.Value}h";
                })
                .ToList();

            if (categoryViolations.Count > 0)
            {
                return BadRequest("Cannot freeze: Category hour allocation mismatch. " + string.Join(", ", categoryViolations));
            }

            plan.IsFrozen = true;
            await _context.SaveChangesAsync();

            return Ok(plan);
        }

        // POST: api/weeklyplan/{id}/unfreeze
        [HttpPost("{id}/unfreeze")]
        public async Task<IActionResult> Unfreeze(string id)
        {
            var plan = await _context.WeeklyPlans.FindAsync(id);

            if (plan == null)
            {
                return NotFound();
            }

            plan.IsFrozen = false;
            await _context.SaveChangesAsync();

            return Ok(plan);
        }

        // DELETE: api/weeklyplan/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeeklyPlan(string id)
        {
            var plan = await _context.WeeklyPlans.FindAsync(id);
            
            if (plan == null)
            {
                return NotFound();
            }

            _context.WeeklyPlans.Remove(plan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeeklyPlanExists(string id)
        {
            return _context.WeeklyPlans.Any(e => e.Id == id);
        }

        private static DateTime GetPlanningWeekTuesday(DateTime date)
        {
            var resolvedDate = date.Date;
            while (resolvedDate.DayOfWeek != DayOfWeek.Tuesday)
            {
                resolvedDate = resolvedDate.AddDays(-1);
            }

            return resolvedDate;
        }
    }
}

