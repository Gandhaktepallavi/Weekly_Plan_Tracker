using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/team-members")]
public class TeamController : ControllerBase
{
    private static List<TeamMember> members = new();

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(members);
    }

    [HttpPost]
    public IActionResult Create(TeamMember member)
    {
        members.Add(member);
        return Ok(member);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        members.RemoveAll(x => x.Id == id);
        return Ok();
    }
}