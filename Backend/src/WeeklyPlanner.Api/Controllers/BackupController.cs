using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BackupController : ControllerBase
{
    private readonly WeeklyPlannerDbContext _context;
    private readonly ILogger<BackupController> _logger;

    public BackupController(WeeklyPlannerDbContext context, ILogger<BackupController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import([FromBody] BackupImportRequest request)
    {
        if (request.Data == null)
        {
            return BadRequest("Invalid backup payload.");
        }

        _context.TaskAssignments.RemoveRange(_context.TaskAssignments);
        _context.PlannedTasks.RemoveRange(_context.PlannedTasks);
        _context.WeeklyPlans.RemoveRange(_context.WeeklyPlans);
        _context.BacklogItems.RemoveRange(_context.BacklogItems);
        _context.TeamMembers.RemoveRange(_context.TeamMembers);
        _context.CategorySettings.RemoveRange(_context.CategorySettings);
        await _context.SaveChangesAsync();

        if (request.Data.TeamMembers?.Count > 0)
        {
            _context.TeamMembers.AddRange(request.Data.TeamMembers);
        }

        if (request.Data.Backlog?.Count > 0)
        {
            _context.BacklogItems.AddRange(request.Data.Backlog);
        }

        if (request.Data.Tasks?.Count > 0)
        {
            _context.TaskAssignments.AddRange(request.Data.Tasks);
        }

        if (request.Data.PlannedTasks?.Count > 0)
        {
            _context.PlannedTasks.AddRange(request.Data.PlannedTasks);
        }

        if (request.Data.CurrentWeeklyPlan != null)
        {
            _context.WeeklyPlans.Add(request.Data.CurrentWeeklyPlan);
        }

        if (request.Data.CategorySettings != null)
        {
            _context.CategorySettings.Add(request.Data.CategorySettings);
        }

        await _context.SaveChangesAsync();
        _logger.LogInformation("Backup import completed successfully.");

        return Ok(new { imported = true });
    }

    public class BackupImportRequest
    {
        public BackupData? Data { get; set; }
    }

    public class BackupData
    {
        public List<TeamMember>? TeamMembers { get; set; }
        public List<BacklogItem>? Backlog { get; set; }
        public List<TaskAssignment>? Tasks { get; set; }
        public List<PlannedTask>? PlannedTasks { get; set; }
        public WeeklyPlan? CurrentWeeklyPlan { get; set; }
        public CategorySettings? CategorySettings { get; set; }
    }

    [HttpPost("seed-sample")]
    public async Task<IActionResult> SeedSampleData()
    {
        var sampleMembers = new[]
        {
            new TeamMember { Name = "Alice Chen", IsTeamLead = true, IsActive = true },
            new TeamMember { Name = "Bob Martinez", IsTeamLead = false, IsActive = true },
            new TeamMember { Name = "Carol Singh", IsTeamLead = false, IsActive = true },
            new TeamMember { Name = "Dave Kim", IsTeamLead = false, IsActive = true }
        };

        foreach (var member in sampleMembers)
        {
            var exists = await _context.TeamMembers
                .AnyAsync(m => m.Name.ToLower() == member.Name.ToLower());

            if (!exists)
            {
                member.Id = Guid.NewGuid().ToString();
                _context.TeamMembers.Add(member);
            }
        }

        var sampleBacklog = new[]
        {
            new BacklogItem { Title = "Client Onboarding Improvements", Category = Category.Client, EstimatedHours = 8 },
            new BacklogItem { Title = "API Refactor - Error Handling", Category = Category.TechDebt, EstimatedHours = 6 },
            new BacklogItem { Title = "AI Assistant Proof of Concept", Category = Category.RnD, EstimatedHours = 10 }
        };

        foreach (var item in sampleBacklog)
        {
            var exists = await _context.BacklogItems
                .AnyAsync(b => b.Title.ToLower() == item.Title.ToLower());

            if (!exists)
            {
                item.Id = Guid.NewGuid().ToString();
                _context.BacklogItems.Add(item);
            }
        }

        var weekStart = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + 1);
        var hasPlan = await _context.WeeklyPlans.AnyAsync(p => p.WeekStart.Date == weekStart.Date);
        if (!hasPlan)
        {
            _context.WeeklyPlans.Add(new WeeklyPlan
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "Alice Chen",
                WeekStart = weekStart,
                TotalHours = 120,
                IsFrozen = false,
                CategoryAllocations = new List<CategoryAllocation>
                {
                    new() { Category = CategoryType.Client, Percentage = 50 },
                    new() { Category = CategoryType.TechDebt, Percentage = 30 },
                    new() { Category = CategoryType.RnD, Percentage = 20 }
                }
            });
        }

        var hasCategorySettings = await _context.CategorySettings.AnyAsync(c => c.WeekStart.Date == weekStart.Date);
        if (!hasCategorySettings)
        {
            _context.CategorySettings.Add(new CategorySettings
            {
                Id = Guid.NewGuid().ToString(),
                WeekStart = weekStart,
                ClientPercent = 50,
                TechDebtPercent = 30,
                RnDPercent = 20,
                SetByUserId = "sample-seed"
            });
        }

        await _context.SaveChangesAsync();
        _logger.LogInformation("Sample seed completed.");

        return Ok(new { seeded = true });
    }
}
