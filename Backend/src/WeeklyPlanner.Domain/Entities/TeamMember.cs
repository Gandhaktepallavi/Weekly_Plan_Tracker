namespace WeeklyPlanner.Domain.Entities;

/// <summary>
/// Represents a team member in the weekly planner system
/// </summary>
public class TeamMember
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public bool IsTeamLead { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

