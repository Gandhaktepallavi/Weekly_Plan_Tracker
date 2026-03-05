using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly WeeklyPlannerDbContext _context;

        public DashboardController(WeeklyPlannerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var data = await _context.TaskAssignments
                .GroupBy(t => t.TeamMemberId)
                .Select(g => new
                {
                    Member = g.Key,
                    Progress = g.Average(x => x.ProgressPercent)
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}