using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDashboard()
    {
        var tasks = TaskController.Tasks;

        var result = tasks
            .GroupBy(t => t.TeamMemberId)
            .Select(g => new
            {
                Member = g.Key,
                Progress = g.Average(x => x.ProgressPercent)
            });

        return Ok(result);
    }
}