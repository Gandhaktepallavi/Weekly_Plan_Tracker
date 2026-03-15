using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlannedTasksController : ControllerBase
{
    private readonly WeeklyPlannerDbContext _context;
    private readonly ILogger<PlannedTasksController> _logger;

    public PlannedTasksController(WeeklyPlannerDbContext context, ILogger<PlannedTasksController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("weekly-plan/{planId}")]
    public ActionResult<IEnumerable<PlannedTask>> GetByPlanId(string planId)
    {
        var tasks = _context.PlannedTasks
            .Where(t => t.WeeklyPlanId == planId)
            .ToList();
        return Ok(tasks);
    }

    [HttpGet("user/{userId}")]
    public ActionResult<IEnumerable<PlannedTask>> GetByUserId(string userId)
    {
        var tasks = _context.PlannedTasks
            .Where(t => t.UserId == userId)
            .ToList();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public ActionResult<PlannedTask> GetById(string id)
    {
        var task = _context.PlannedTasks.FirstOrDefault(t => t.Id == id);
        
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPost]
    public ActionResult<PlannedTask> Create(PlannedTask task)
    {
        task.Id = Guid.NewGuid().ToString();
        _context.PlannedTasks.Add(task);
        _context.SaveChanges();
        
        _logger.LogInformation("Created planned task {Id} for user {UserId}", task.Id, task.UserId);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public ActionResult<PlannedTask> Update(string id, PlannedTask task)
    {
        if (id != task.Id)
        {
            return BadRequest();
        }

        var existing = _context.PlannedTasks.Find(id);
        if (existing == null)
        {
            return NotFound();
        }

        existing.PlannedHours = task.PlannedHours;
        existing.CompletedHours = task.CompletedHours;
        existing.Progress = task.Progress;
        
        _context.SaveChanges();
        return Ok(existing);
    }

    [HttpPut("{id}/progress")]
    public ActionResult<PlannedTask> UpdateProgress(string id, [FromBody] int progress)
    {
        var task = _context.PlannedTasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        task.Progress = Math.Clamp(progress, 0, 100);
        
        // Calculate completed hours based on progress
        if (task.PlannedHours > 0)
        {
            task.CompletedHours = (task.PlannedHours * task.Progress) / 100.0;
        }
        
        _context.SaveChanges();
        
        _logger.LogInformation("Updated task {Id} progress to {Progress}%", id, progress);
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(string id)
    {
        var task = _context.PlannedTasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        _context.PlannedTasks.Remove(task);
        _context.SaveChanges();
        
        return NoContent();
    }

    [HttpGet("summary/team/{planId}")]
    public ActionResult GetTeamSummary(string planId)
    {
        var tasks = _context.PlannedTasks
            .Where(t => t.WeeklyPlanId == planId)
            .ToList();

        var summary = tasks
            .GroupBy(t => t.UserId)
            .Select(g => new
            {
                UserId = g.Key,
                TotalTasks = g.Count(),
                TotalPlannedHours = g.Sum(t => t.PlannedHours),
                TotalCompletedHours = g.Sum(t => t.CompletedHours),
                OverallProgress = g.Sum(t => t.PlannedHours) > 0 
                    ? (int)((g.Sum(t => t.CompletedHours) / g.Sum(t => t.PlannedHours)) * 100)
                    : 0
            })
            .ToList();

        return Ok(summary);
    }
}

