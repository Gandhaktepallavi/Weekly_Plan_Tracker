using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/backup")]
public class BackupController : ControllerBase
{
    private readonly WeeklyPlannerDbContext _context;

    public BackupController(WeeklyPlannerDbContext context)
    {
        _context = context;
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import([FromBody] BackupImportRequest request)
    {
        if (request.Data is null)
        {
            return BadRequest("Invalid backup payload.");
        }

        var teamMembers = request.Data.TeamMembers ?? new List<TeamMember>();
        var backlog = request.Data.Backlog ?? new List<BacklogItem>();
        var weeklyPlans = request.Data.WeeklyPlans ?? new List<WeeklyPlan>();
        var tasks = request.Data.Tasks ?? new List<TaskAssignment>();

        _context.TaskAssignments.RemoveRange(_context.TaskAssignments);
        _context.WeeklyPlans.RemoveRange(_context.WeeklyPlans);
        _context.BacklogItems.RemoveRange(_context.BacklogItems);
        _context.TeamMembers.RemoveRange(_context.TeamMembers);
        await _context.SaveChangesAsync();

        if (teamMembers.Count > 0)
        {
            _context.TeamMembers.AddRange(teamMembers);
        }

        if (backlog.Count > 0)
        {
            _context.BacklogItems.AddRange(backlog);
        }

        if (weeklyPlans.Count > 0)
        {
            foreach (var plan in weeklyPlans)
            {
                plan.TaskAssignments = new List<TaskAssignment>();
                plan.SelectedMemberIds ??= new List<string>();
            }

            _context.WeeklyPlans.AddRange(weeklyPlans);
        }

        if (tasks.Count > 0)
        {
            _context.TaskAssignments.AddRange(tasks);
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            imported = true,
            teamMembers = teamMembers.Count,
            backlogItems = backlog.Count,
            weeklyPlans = weeklyPlans.Count,
            tasks = tasks.Count
        });
    }

    [HttpPost("seed-sample")]
    public async Task<IActionResult> SeedSampleData()
    {
        var existingMembers = _context.TeamMembers.ToList();
        var existingBacklog = _context.BacklogItems.ToList();
        var existingPlans = _context.WeeklyPlans.ToList();

        var sampleMembers = new[]
        {
            new { Name = "Alice Chen", IsLead = true },
            new { Name = "Bob Martinez", IsLead = false },
            new { Name = "Carol Singh", IsLead = false },
            new { Name = "Dave Kim", IsLead = false }
        };

        var memberMap = new Dictionary<string, TeamMember>(StringComparer.OrdinalIgnoreCase);
        foreach (var member in sampleMembers)
        {
            var existing = existingMembers.FirstOrDefault(m => m.Name.Equals(member.Name, StringComparison.OrdinalIgnoreCase));
            if (existing is null)
            {
                existing = new TeamMember
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = member.Name,
                    IsLead = member.IsLead,
                    IsActive = true
                };
                _context.TeamMembers.Add(existing);
            }

            memberMap[member.Name] = existing;
        }

        var sampleBacklog = new[]
        {
            new { Title = "Client Dashboard Enhancements", Category = Category.Client, Hours = 12d },
            new { Title = "API Error Handling Cleanup", Category = Category.TechDebt, Hours = 8d },
            new { Title = "AI Planning Assistant Spike", Category = Category.RnD, Hours = 10d },
            new { Title = "Customer Report Export", Category = Category.Client, Hours = 10d },
            new { Title = "Refactor Task Assignment Flow", Category = Category.TechDebt, Hours = 8d },
            new { Title = "Prototype Mobile Planning UX", Category = Category.RnD, Hours = 6d }
        };

        var backlogMap = new Dictionary<string, BacklogItem>(StringComparer.OrdinalIgnoreCase);
        foreach (var item in sampleBacklog)
        {
            var existing = existingBacklog.FirstOrDefault(b => b.Title.Equals(item.Title, StringComparison.OrdinalIgnoreCase));
            if (existing is null)
            {
                existing = new BacklogItem
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = item.Title,
                    Category = item.Category,
                    EstimatedHours = item.Hours,
                    Status = "Available"
                };
                _context.BacklogItems.Add(existing);
            }

            backlogMap[item.Title] = existing;
        }

        var planTuesday = GetPlanningWeekTuesday(DateTime.Today);
        var weeklyPlan = existingPlans.FirstOrDefault(p => p.WeekStart.Date == planTuesday.Date);
        if (weeklyPlan is null)
        {
            weeklyPlan = new WeeklyPlan
            {
                Id = Guid.NewGuid().ToString(),
                WeekStart = planTuesday,
                WeekEnd = planTuesday.AddDays(6),
                IsFrozen = false,
                ClientPercent = 50,
                TechDebtPercent = 30,
                RndPercent = 20,
                SelectedMemberIds = memberMap.Values.Select(m => m.Id).ToList()
            };
            _context.WeeklyPlans.Add(weeklyPlan);
        }

        await _context.SaveChangesAsync();

        return Ok(new { seeded = true });
    }

    [HttpPost("reset-all")]
    public async Task<IActionResult> ResetAll()
    {
        _context.TaskAssignments.RemoveRange(_context.TaskAssignments);
        _context.WeeklyPlans.RemoveRange(_context.WeeklyPlans);
        _context.BacklogItems.RemoveRange(_context.BacklogItems);
        _context.TeamMembers.RemoveRange(_context.TeamMembers);
        await _context.SaveChangesAsync();

        CategorySettingsController.ResetDefaults();

        return Ok(new { reset = true });
    }

    public class BackupImportRequest
    {
        public BackupData? Data { get; set; }
    }

    public class BackupData
    {
        public List<TeamMember>? TeamMembers { get; set; }
        public List<BacklogItem>? Backlog { get; set; }
        public List<WeeklyPlan>? WeeklyPlans { get; set; }
        public List<TaskAssignment>? Tasks { get; set; }
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
