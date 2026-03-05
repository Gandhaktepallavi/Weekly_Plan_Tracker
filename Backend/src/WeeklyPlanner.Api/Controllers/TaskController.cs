using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Infrastructure;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Controllers
{
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
            var tasks = await _context.TaskAssignments.ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> AssignTask(TaskAssignment task)
        {
            task.Id = Guid.NewGuid().ToString();

            _context.TaskAssignments.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpPut("{id}/progress")]
        public async Task<IActionResult> UpdateProgress(string id, int percent)
        {
            var task = await _context.TaskAssignments.FindAsync(id);

            if (task == null)
                return NotFound();

            task.ProgressPercent = percent;

            await _context.SaveChangesAsync();

            return Ok(task);
        }
    }
}