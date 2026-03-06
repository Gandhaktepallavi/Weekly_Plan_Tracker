namespace WeeklyPlanner.Domain.Entities;

public class TeamMember
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Name { get; set; } = string.Empty;

    public bool IsLead { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation property
    public ICollection<TaskAssignment> TaskAssignments { get; set; } = new List<TaskAssignment>();
}
