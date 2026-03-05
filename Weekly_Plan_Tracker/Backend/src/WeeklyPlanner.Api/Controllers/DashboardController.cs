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
            // Get current week's plan
            var today = DateTime.Today;
            var daysToTuesday = ((int)DayOfWeek.Tuesday - (int)today.DayOfWeek + 7) % 7;
            var tuesday = today.AddDays(daysToTuesday);

            var currentPlan = await _context.WeeklyPlans
                .Include(w => w.TaskAssignments)
                .ThenInclude(t => t.TeamMember)
                .Include(w => w.TaskAssignments)
                .ThenInclude(t => t.BacklogItem)
                .FirstOrDefaultAsync(p => p.WeekStart.Date == tuesday.Date);

            if (currentPlan == null)
            {
                return Ok(new 
                {
                    hasActivePlan = false,
                    isFrozen = false,
                    members = new object[] { },
                    categories = new object[] { }
                });
            }

            // Get member-wise progress
            var memberProgress = currentPlan.TaskAssignments
                .GroupBy(t => new { t.TeamMemberId, t.TeamMember?.Name })
                .Select(g => new
                {
                    memberId = g.Key.TeamMemberId,
                    memberName = g.Key.Name ?? "Unknown",
                    totalHours = g.Sum(t => t.AssignedHours),
                    avgProgress = g.Average(t => t.ProgressPercent),
                    taskCount = g.Count()
                })
                .ToList();

            // Get category-wise progress
            var categoryProgress = currentPlan.TaskAssignments
                .GroupJoin(
                    _context.BacklogItems,
                    t => t.BacklogItemId,
                    b => b.Id,
                    (t, backlogItems) => new { Task = t, BacklogItems = backlogItems.DefaultIfEmpty() }
                )
                .SelectMany(x => x.BacklogItems.Select(b => new { x.Task, BacklogItem = b }))
                .GroupBy(x => x.BacklogItem?.Category)
                .Select(g => new
                {
                    category = g.Key?.ToString() ?? "Unknown",
                    totalHours = g.Sum(x => x.Task.AssignedHours),
                    taskCount = g.Count(),
                    avgProgress = g.Average(x => x.Task.ProgressPercent)
                })
                .ToList();

            return Ok(new
            {
                hasActivePlan = true,
                isFrozen = currentPlan.IsFrozen,
                planId = currentPlan.Id,
                weekStart = currentPlan.WeekStart,
                weekEnd = currentPlan.WeekEnd,
                clientPercent = currentPlan.ClientPercent,
                techDebtPercent = currentPlan.TechDebtPercent,
                rndPercent = currentPlan.RndPercent,
                members = memberProgress,
                categories = categoryProgress,
                tasks = currentPlan.TaskAssignments.Select(t => new
                {
                    id = t.Id,
                    memberId = t.TeamMemberId,
                    memberName = t.TeamMember?.Name,
                    backlogTitle = t.BacklogItem?.Title,
                    category = t.BacklogItem?.Category.ToString(),
                    assignedHours = t.AssignedHours,
                    progressPercent = t.ProgressPercent
                })
            });
        }

        // GET: api/dashboard/member/{memberId}
        [HttpGet("member/{memberId}")]
        public async Task<IActionResult> GetMemberProgress(string memberId)
        {
            var today = DateTime.Today;
            var daysToTuesday = ((int)DayOfWeek.Tuesday - (int)today.DayOfWeek + 7) % 7;
            var tuesday = today.AddDays(daysToTuesday);

            var currentPlan = await _context.WeeklyPlans
                .Include(w => w.TaskAssignments)
                .ThenInclude(t => t.BacklogItem)
                .FirstOrDefaultAsync(p => p.WeekStart.Date == tuesday.Date);

            if (currentPlan == null)
            {
                return Ok(new { tasks = new object[] { } });
            }

            var tasks = currentPlan.TaskAssignments
                .Where(t => t.TeamMemberId == memberId)
                .Select(t => new
                {
                    id = t.Id,
                    backlogTitle = t.BacklogItem?.Title,
                    category = t.BacklogItem?.Category.ToString(),
                    assignedHours = t.AssignedHours,
                    progressPercent = t.ProgressPercent
                })
                .ToList();

            return Ok(new { tasks });
        }

        // GET: api/dashboard/history
        [HttpGet("history")]
        public async Task<IActionResult> GetPastWeeks()
        {
            var plans = await _context.WeeklyPlans
                .Include(w => w.TaskAssignments)
                .ThenInclude(t => t.TeamMember)
                .OrderByDescending(p => p.WeekStart)
                .Take(10)
                .Select(p => new
                {
                    id = p.Id,
                    weekStart = p.WeekStart,
                    weekEnd = p.WeekEnd,
                    isFrozen = p.IsFrozen,
                    clientPercent = p.ClientPercent,
                    techDebtPercent = p.TechDebtPercent,
                    rndPercent = p.RndPercent,
                    memberCount = p.TaskAssignments.Select(t => t.TeamMemberId).Distinct().Count(),
                    totalTasks = p.TaskAssignments.Count(),
                    avgProgress = p.TaskAssignments.Any() ? p.TaskAssignments.Average(t => t.ProgressPercent) : 0
                })
                .ToListAsync();

            return Ok(plans);
        }
    }
}

