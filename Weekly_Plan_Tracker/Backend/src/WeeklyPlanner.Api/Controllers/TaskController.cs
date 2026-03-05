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

        // GET all tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _context.TaskAssignments
                .Include(t => t.TeamMember)
                .Include(t => t.BacklogItem)
                .ToListAsync();
            return Ok(tasks);
        }

        // GET tasks by plan ID
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

        // ASSIGN TASK TO MEMBER
        [HttpPost]
        public async Task<IActionResult> AssignTask(TaskAssignment task)
        {
            // 1️⃣ Check if weekly plan is frozen
            var plan = await _context.WeeklyPlans.FindAsync(task.WeeklyPlanId);

            if (plan != null && plan.IsFrozen)
            {
                return BadRequest("Weekly plan is frozen. Tasks cannot be modified.");
            }

            // 2️⃣ Enforce 30 hour rule
            var totalHours = await _context.TaskAssignments
                .Where(t => t.TeamMemberId == task.TeamMemberId && t.WeeklyPlanId == task.WeeklyPlanId)
                .SumAsync(t => t.AssignedHours);

            if (totalHours + task.AssignedHours > 30)
            {
                return BadRequest("Total planned hours cannot exceed 30.");
            }

            // Create task
            task.Id = Guid.NewGuid().ToString();

            _context.TaskAssignments.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        // UPDATE TASK PROGRESS
        [HttpPut("{id}/progress")]
        public async Task<IActionResult> UpdateProgress(string id, [FromQuery] int percent)
        {
            var task = await _context.TaskAssignments.FindAsync(id);

            if (task == null)
                return NotFound();

            // 3️⃣ Validate progress range
            if (percent < 0 || percent > 100)
            {
                return BadRequest("Progress must be between 0 and 100.");
            }

            task.ProgressPercent = percent;

            await _context.SaveChangesAsync();

            return Ok(task);
        }

        // DELETE TASK
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(string id)
        {
            var task = await _context.TaskAssignments.FindAsync(id);
            
            if (task == null)
                return NotFound();

            // Check if plan is frozen
            var plan = await _context.WeeklyPlans.FindAsync(task.WeeklyPlanId);
            if (plan != null && plan.IsFrozen)
            {
                return BadRequest("Cannot delete tasks from a frozen plan.");
            }

            _context.TaskAssignments.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

