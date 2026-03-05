using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TaskController : ControllerBase
{
    public static List<TaskAssignment> Tasks = new();

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(Tasks);
    }

    [HttpPost]
    public IActionResult Assign(TaskAssignment task)
    {
        Tasks.Add(task);
        return Ok(task);
    }

    [HttpPut("{id}/progress")]
    public IActionResult UpdateProgress(string id, int percent)
    {
        var task = Tasks.FirstOrDefault(x => x.Id == id);

        if (task == null)
            return NotFound();

        task.ProgressPercent = percent;

        return Ok(task);
    }
}