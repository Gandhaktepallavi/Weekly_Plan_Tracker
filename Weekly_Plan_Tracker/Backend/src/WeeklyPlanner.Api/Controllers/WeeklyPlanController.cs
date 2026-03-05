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
            var today = DateTime.Today;
            // Get Tuesday of current week
            var daysToTuesday = ((int)DayOfWeek.Tuesday - (int)today.DayOfWeek + 7) % 7;
            var tuesday = today.AddDays(daysToTuesday);

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
            var today = DateTime.Today;
            var daysToTuesday = ((int)DayOfWeek.Tuesday - (int)today.DayOfWeek + 7) % 7;
            var tuesday = today.AddDays(daysToTuesday);

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
            
            // Calculate week start (Tuesday) and end (Monday)
            var selectedDate = plan.WeekStart;
            var daysToTuesday = ((int)DayOfWeek.Tuesday - (int)selectedDate.DayOfWeek + 7) % 7;
            plan.WeekStart = selectedDate.AddDays(daysToTuesday);
            plan.WeekEnd = plan.WeekStart.AddDays(6); // Monday

            _context.WeeklyPlans.Add(plan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurrentWeeklyPlan), new { id = plan.Id }, plan);
        }

        // PUT: api/weeklyplan/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWeeklyPlan(string id, WeeklyPlan plan)
        {
            if (id != plan.Id)
            {
                return BadRequest();
            }

            _context.Entry(plan).State = EntityState.Modified;

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
                .FirstOrDefaultAsync(w => w.Id == id);

            if (plan == null)
            {
                return NotFound();
            }

            // Validation: Check if all members have 30 hours planned
            var memberHours = plan.TaskAssignments
                .GroupBy(t => t.TeamMemberId)
                .Select(g => new { MemberId = g.Key, Hours = g.Sum(t => t.AssignedHours) })
                .ToList();

            var missingHours = memberHours.Where(m => m.Hours < 30).ToList();
            if (missingHours.Any())
            {
                return BadRequest($"Cannot freeze: Some members have less than 30 hours planned. " +
                    string.Join(", ", missingHours.Select(m => $"{m.MemberId}: {m.Hours}h")));
            }

            // Validate category percentages
            if (plan.ClientPercent + plan.TechDebtPercent + plan.RndPercent != 100)
            {
                return BadRequest("Category percentages must add up to 100%");
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
    }
}

