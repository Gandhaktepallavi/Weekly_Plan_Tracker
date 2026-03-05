using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BacklogController : ControllerBase
    {
        private readonly WeeklyPlannerDbContext _context;
        private readonly ILogger<BacklogController> _logger;

        public BacklogController(WeeklyPlannerDbContext context, ILogger<BacklogController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/backlog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BacklogItem>>> GetBacklog()
        {
            _logger.LogInformation("Fetching backlog items");
            var items = await _context.BacklogItems.ToListAsync();
            return Ok(items);
        }

        // GET: api/backlog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BacklogItem>> GetBacklogItem(string id)
        {
            var item = await _context.BacklogItems.FindAsync(id);
            
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST: api/backlog
        [HttpPost]
        public async Task<ActionResult<BacklogItem>> CreateBacklogItem(BacklogItem item)
        {
            item.Id = Guid.NewGuid().ToString();
            _context.BacklogItems.Add(item);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Created backlog item {Id}", item.Id);
            return CreatedAtAction(nameof(GetBacklogItem), new { id = item.Id }, item);
        }

        // PUT: api/backlog/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBacklogItem(string id, BacklogItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BacklogItemExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/backlog/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBacklogItem(string id)
        {
            var item = await _context.BacklogItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.BacklogItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BacklogItemExists(string id)
        {
            return _context.BacklogItems.Any(e => e.Id == id);
        }
    }
}
