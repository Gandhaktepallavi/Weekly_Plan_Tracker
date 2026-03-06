using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/team-members")]
public class TeamController : ControllerBase
{
    private readonly WeeklyPlannerDbContext _context;

    public TeamController(WeeklyPlannerDbContext context)
    {
        _context = context;
    }

    // GET: api/team-members
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var members = await _context.TeamMembers
            .Where(m => m.IsActive)
            .ToListAsync();
        return Ok(members);
    }

    // GET: api/team-members/all (including inactive)
    [HttpGet("all")]
    public async Task<IActionResult> GetAllIncludingInactive()
    {
        var members = await _context.TeamMembers.ToListAsync();
        return Ok(members);
    }

    // POST: api/team-members
    [HttpPost]
    public async Task<IActionResult> Create(TeamMember member)
    {
        member.Id = Guid.NewGuid().ToString();
        member.IsActive = true;
        
        _context.TeamMembers.Add(member);
        await _context.SaveChangesAsync();
        
        return Ok(member);
    }

    // PUT: api/team-members/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, TeamMember member)
    {
        if (id != member.Id)
        {
            return BadRequest();
        }

        _context.Entry(member).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TeamMemberExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // PUT: api/team-members/{id}/lead
    [HttpPut("{id}/lead")]
    public async Task<IActionResult> MakeLead(string id)
    {
        var member = await _context.TeamMembers.FindAsync(id);
        
        if (member == null)
        {
            return NotFound();
        }

        // Remove lead status from all other members
        var allMembers = await _context.TeamMembers.ToListAsync();
        foreach (var m in allMembers)
        {
            m.IsLead = false;
        }

        member.IsLead = true;
        await _context.SaveChangesAsync();

        return Ok(member);
    }

    // PUT: api/team-members/{id}/deactivate
    [HttpPut("{id}/deactivate")]
    public async Task<IActionResult> Deactivate(string id)
    {
        var member = await _context.TeamMembers.FindAsync(id);
        
        if (member == null)
        {
            return NotFound();
        }

        member.IsActive = false;
        await _context.SaveChangesAsync();

        return Ok(member);
    }

    // PUT: api/team-members/{id}/activate
    [HttpPut("{id}/activate")]
    public async Task<IActionResult> Activate(string id)
    {
        var member = await _context.TeamMembers.FindAsync(id);
        
        if (member == null)
        {
            return NotFound();
        }

        member.IsActive = true;
        await _context.SaveChangesAsync();

        return Ok(member);
    }

    // DELETE: api/team-members/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var member = await _context.TeamMembers.FindAsync(id);
        
        if (member == null)
        {
            return NotFound();
        }

        _context.TeamMembers.Remove(member);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TeamMemberExists(string id)
    {
        return _context.TeamMembers.Any(e => e.Id == id);
    }
}

