namespace WeeklyPlanner.Domain.Entities;

public class TeamMember
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Name { get; set; }

    public bool IsLead { get; set; }

    public bool IsActive { get; set; } = true;
}