using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TaskController : ControllerBase
{
    private readonly WeeklyPlannerDbContext _context;

    public TaskController(WeeklyPlannerDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await _context.TaskAssignments
            .Include(t => t.TeamMember)
            .Include(t => t.BacklogItem)
            .ToListAsync();
        return Ok(tasks);
    }

    [HttpGet("plan/{planId}")]
    public async Task<IActionResult> GetTasksByPlan(string planId)
    {
        var tasks = await _context.TaskAssignments
            .Include(t => t.TeamMember)
            .Include(t => t.BacklogItem)
            .Where(t => t.WeeklyPlanId == planId)
            .ToListAsync();
        return Ok(tasks);
    }

    [HttpPost]
    public async Task<IActionResult> AssignTask(TaskAssignment task)
    {
        var plan = await _context.WeeklyPlans.FindAsync(task.WeeklyPlanId);
        if (plan is null)
        {
            return BadRequest("Weekly plan was not found.");
        }

        if (plan.IsFrozen)
        {
            return BadRequest("Weekly plan is frozen. Tasks cannot be modified.");
        }

        var backlogItem = await _context.BacklogItems.FindAsync(task.BacklogItemId);
        if (backlogItem is null)
        {
            return BadRequest("Backlog item was not found.");
        }

        var memberExists = await _context.TeamMembers.AnyAsync(m => m.Id == task.TeamMemberId && m.IsActive);
        if (!memberExists)
        {
            return BadRequest("Team member was not found or is inactive.");
        }

        var duplicateBacklog = await _context.TaskAssignments.AnyAsync(t =>
            t.WeeklyPlanId == task.WeeklyPlanId && t.BacklogItemId == task.BacklogItemId);
        if (duplicateBacklog)
        {
            return BadRequest("Backlog item is already assigned in this weekly plan.");
        }

        var totalHours = await _context.TaskAssignments
            .Where(t => t.TeamMemberId == task.TeamMemberId && t.WeeklyPlanId == task.WeeklyPlanId)
            .SumAsync(t => t.AssignedHours);

        if (totalHours + task.AssignedHours > 30)
        {
            return BadRequest("Total planned hours cannot exceed 30.");
        }

        task.Id = Guid.NewGuid().ToString();
        task.ProgressPercent = Math.Clamp(task.ProgressPercent, 0, 100);

        _context.TaskAssignments.Add(task);
        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpPut("{id}/progress")]
    public async Task<IActionResult> UpdateProgress(string id, [FromQuery] int percent)
    {
        var task = await _context.TaskAssignments.FindAsync(id);
        if (task is null)
        {
            return NotFound();
        }

        if (percent is < 0 or > 100)
        {
            return BadRequest("Progress must be between 0 and 100.");
        }

        task.ProgressPercent = percent;
        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(string id)
    {
        var task = await _context.TaskAssignments.FindAsync(id);
        if (task is null)
        {
            return NotFound();
        }

        var plan = await _context.WeeklyPlans.FindAsync(task.WeeklyPlanId);
        if (plan is not null && plan.IsFrozen)
        {
            return BadRequest("Cannot delete tasks from a frozen plan.");
        }

        _context.TaskAssignments.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
