using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
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

        public class OpenPlanningRequest
        {
            public DateTime PlanningDate { get; set; }
            public List<string> SelectedMemberIds { get; set; } = new();
            public double ClientPercent { get; set; }
            public double TechDebtPercent { get; set; }
            public double RnDPercent { get; set; }
            public string? LeadUserId { get; set; }
            public string? LeadUserName { get; set; }
        }

        // GET: api/weeklyplan/current
        [HttpGet("current")]
        public async Task<ActionResult<WeeklyPlan>> GetCurrentWeeklyPlan()
        {
            var today = DateTime.Today;
<<<<<<< HEAD
            var weekStart = today.AddDays(-(int)today.DayOfWeek);
=======

            // Monday as start of week
            var weekStart = today.AddDays(-(int)today.DayOfWeek + 1);
>>>>>>> backend-setup

            var plan = await _context.WeeklyPlans
                .FirstOrDefaultAsync(p => p.WeekStart.Date == weekStart.Date);

<<<<<<< HEAD
            return plan ?? new WeeklyPlan
            {
                WeekStart = weekStart,
                IsFrozen = false
            };
=======
            if (plan == null)
            {
                return new WeeklyPlan
                {
                    WeekStart = weekStart,
                    IsFrozen = false
                };
            }

            return plan;
>>>>>>> backend-setup
        }

        // POST: api/weeklyplan
        [HttpPost]
        public async Task<ActionResult<WeeklyPlan>> CreateWeeklyPlan(WeeklyPlan plan)
        {
            plan.Id = Guid.NewGuid().ToString();

<<<<<<< HEAD
            _context.WeeklyPlans.Add(plan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurrentWeeklyPlan), plan);
=======
            _context.WeeklyPlans.Add(plan);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurrentWeeklyPlan), plan);
        }

        // POST: api/weeklyplan/open
        [HttpPost("open")]
        public async Task<ActionResult<WeeklyPlan>> OpenPlanning([FromBody] OpenPlanningRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request.");
            }

            if (request.PlanningDate == default)
            {
                return BadRequest("Planning date is required.");
            }

            if (request.PlanningDate.DayOfWeek != DayOfWeek.Tuesday)
            {
                return BadRequest("Planning must be opened on Tuesday.");
            }

            if (request.SelectedMemberIds == null || request.SelectedMemberIds.Count == 0)
            {
                return BadRequest("At least one team member must be selected.");
            }

            if (string.IsNullOrWhiteSpace(request.LeadUserId))
            {
                return BadRequest("Lead user is required.");
            }

            var isTeamLead = await _context.TeamMembers
                .Where(t => t.Id == request.LeadUserId && t.IsActive)
                .Select(t => t.IsTeamLead)
                .FirstOrDefaultAsync();

            if (!isTeamLead)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Only Team Lead can set the weekly plan.");
            }

            var totalPercent = request.ClientPercent + request.TechDebtPercent + request.RnDPercent;
            if (Math.Abs(totalPercent - 100) > 0.01)
            {
                return BadRequest("Category percentages must total 100%.");
            }

            var weekStart = request.PlanningDate.Date.AddDays(1); // Wednesday
            var existingOpenId = await _context.WeeklyPlans
                .Where(p => p.WeekStart.Date == weekStart.Date && !p.IsFrozen)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();

            if (!string.IsNullOrWhiteSpace(existingOpenId))
            {
                return Conflict("A planning cycle is already open for this week.");
            }

            var leadName = request.LeadUserName;
            if (string.IsNullOrWhiteSpace(leadName))
            {
                leadName = await _context.TeamMembers
                    .Where(t => t.IsTeamLead && t.IsActive)
                    .Select(t => t.Name)
                    .FirstOrDefaultAsync() ?? "Team Lead";
            }

            var plan = new WeeklyPlan
            {
                Id = Guid.NewGuid().ToString(),
                UserName = leadName,
                WeekStart = weekStart,
                TotalHours = request.SelectedMemberIds.Count * 30,
                IsFrozen = false,
                CategoryAllocations = new List<CategoryAllocation>
                {
                    new() { Category = CategoryType.Client, Percentage = request.ClientPercent },
                    new() { Category = CategoryType.TechDebt, Percentage = request.TechDebtPercent },
                    new() { Category = CategoryType.RnD, Percentage = request.RnDPercent }
                }
            };

            _context.WeeklyPlans.Add(plan);
            await _context.SaveChangesAsync();

            return Ok(plan);
>>>>>>> backend-setup
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

<<<<<<< HEAD
        [HttpGet("active-exists")]
        public IActionResult HasActivePlan()
        {
            return Ok(false);
        }

        [HttpGet("/api/user/profile")]
        public IActionResult GetProfile()
        {
            return Ok(new { name = "jj", role = "Team Lead" });
=======
        // GET: api/weeklyplan/active-exists
        [HttpGet("active-exists")]
        public async Task<IActionResult> HasActivePlan()
        {
            var openPlanId = await _context.WeeklyPlans
                .Where(p => !p.IsFrozen)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();

            return Ok(!string.IsNullOrWhiteSpace(openPlanId));
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
>>>>>>> backend-setup
        }
    }
}