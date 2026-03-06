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

            // Monday as start of week
            var weekStart = today.AddDays(-(int)today.DayOfWeek + 1);

            var plan = await _context.WeeklyPlans
                .FirstOrDefaultAsync(p => p.WeekStart.Date == weekStart.Date);

            if (plan == null)
            {
                return new WeeklyPlan
                {
                    WeekStart = weekStart,
                    IsFrozen = false
                };
            }

            return plan;
        }

        // POST: api/weeklyplan
        [HttpPost]
        public async Task<ActionResult<WeeklyPlan>> CreateWeeklyPlan(WeeklyPlan plan)
        {
            plan.Id = Guid.NewGuid().ToString();

            _context.WeeklyPlans.Add(plan);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurrentWeeklyPlan), plan);
        }

        // PUT: api/weeklyplan/{id}/freeze
        [HttpPut("{id}/freeze")]
        public async Task<IActionResult> FreezePlan(string id)
        {
            var plan = await _context.WeeklyPlans.FindAsync(id);

            if (plan == null)
                return NotFound();

            plan.IsFrozen = true;

            await _context.SaveChangesAsync();

            return Ok(plan);
        }

        // GET: api/weeklyplan/active-exists
        [HttpGet("active-exists")]
        public async Task<IActionResult> HasActivePlan()
        {
            var exists = await _context.WeeklyPlans.AnyAsync(p => !p.IsFrozen);

            return Ok(exists);
        }

        // GET: api/weeklyplan/profile
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            return Ok(new
            {
                name = "Team Lead",
                role = "Lead"
            });
        }

        // GET: api/weeklyplan/past
        [HttpGet("past")]
        public async Task<IActionResult> GetPastWeeks()
        {
            var today = DateTime.Today;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek + 1);

            var plans = await _context.WeeklyPlans
                .Where(p => p.WeekStart.Date < thisWeekStart.Date)
                .OrderByDescending(p => p.WeekStart)
                .ToListAsync();

            var result = new List<object>();
            foreach (var plan in plans)
            {
                var tasks = await _context.PlannedTasks
                    .Where(t => t.WeeklyPlanId == plan.Id)
                    .ToListAsync();

                var memberIds = tasks
                    .Select(t => t.UserId)
                    .Where(id => !string.IsNullOrWhiteSpace(id))
                    .Distinct()
                    .ToList();

                var totalPlannedHours = tasks.Sum(t => t.PlannedHours);
                var totalCompletedHours = tasks.Sum(t => t.CompletedHours);
                var progressPercent = totalPlannedHours > 0
                    ? (int)Math.Round((totalCompletedHours / totalPlannedHours) * 100)
                    : 0;

                result.Add(new
                {
                    plan.Id,
                    plan.WeekStart,
                    plan.IsFrozen,
                    plan.TotalHours,
                    TeamMembersCount = memberIds.Count,
                    TaskCount = tasks.Count,
                    TotalPlannedHours = totalPlannedHours,
                    TotalCompletedHours = totalCompletedHours,
                    ProgressPercent = progressPercent
                });
            }

            return Ok(result);
        }
    }
}
