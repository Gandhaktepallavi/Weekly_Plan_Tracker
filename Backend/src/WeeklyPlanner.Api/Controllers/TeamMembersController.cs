using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Application.Services;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamMembersController : ControllerBase
{
    private readonly ITeamMemberService _teamMemberService;
    private readonly ILogger<TeamMembersController> _logger;

    public TeamMembersController(ITeamMemberService teamMemberService, ILogger<TeamMembersController> logger)
    {
        _teamMemberService = teamMemberService;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<TeamMember>> GetAll([FromQuery] bool includeInactive = false)
    {
        var members = includeInactive 
            ? _teamMemberService.GetAllIncludingInactive() 
            : _teamMemberService.GetAll();
        return Ok(members);
    }

    [HttpGet("{id}")]
    public ActionResult<TeamMember> GetById(string id)
    {
        var member = _teamMemberService.GetById(id);
        if (member == null)
        {
            return NotFound();
        }
        return Ok(member);
    }

    [HttpGet("lead")]
    public ActionResult<TeamMember> GetTeamLead()
    {
        var lead = _teamMemberService.GetTeamLead();
        if (lead == null)
        {
            return NotFound("No team lead found");
        }
        return Ok(lead);
    }

    [HttpPost]
    public ActionResult<TeamMember> Create(TeamMember member)
    {
        var created = _teamMemberService.Add(member);
        _logger.LogInformation("Created team member {Id}: {Name}", created.Id, created.Name);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public ActionResult<TeamMember> Update(string id, TeamMember member)
    {
        if (id != member.Id)
        {
            return BadRequest();
        }

        var updated = _teamMemberService.Update(member);
        if (updated == null)
        {
            return NotFound();
        }

        return Ok(updated);
    }

    [HttpPut("{id}/set-lead")]
    public IActionResult SetAsTeamLead(string id)
    {
        var result = _teamMemberService.SetAsTeamLead(id);
        if (!result)
        {
            return NotFound();
        }

        return Ok(new { message = "Team lead updated successfully" });
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(string id)
    {
        var result = _teamMemberService.Delete(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}

