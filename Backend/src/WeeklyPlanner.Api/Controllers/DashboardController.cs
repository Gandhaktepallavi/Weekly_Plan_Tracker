using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace WeeklyPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly WeeklyPlannerDbContext _context;

        public DashboardController(WeeklyPlannerDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public IActionResult Summary()
        {
            var total = _context.PlannedTasks.Count();

            var completed = _context.PlannedTasks
                .Count(t => t.Progress == 100);

            return Ok(new
            {
                TotalTasks = total,
                Completed = completed,
                Remaining = total - completed
            });
        }
    }
}