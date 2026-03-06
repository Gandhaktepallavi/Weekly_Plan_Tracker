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
            var weekStart = today.AddDays(-(int)today.DayOfWeek);

            var plan = await _context.WeeklyPlans
                .FirstOrDefaultAsync(p => p.WeekStart.Date == weekStart.Date);

            return plan ?? new WeeklyPlan
            {
                WeekStart = weekStart,
                IsFrozen = false
            };
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

        // POST: api/weeklyplan/{id}/freeze
        [HttpPost("{id}/freeze")]
        public async Task<IActionResult> Freeze(string id)
        {
            var plan = await _context.WeeklyPlans.FindAsync(id);

            if (plan == null)
                return NotFound();

            plan.IsFrozen = true;

            await _context.SaveChangesAsync();

            return Ok(plan);
        }

        [HttpGet("active-exists")]
        public IActionResult HasActivePlan()
        {
            return Ok(false);
        }

        [HttpGet("/api/user/profile")]
        public IActionResult GetProfile()
        {
            return Ok(new { name = "jj", role = "Team Lead" });
        }
    }
}