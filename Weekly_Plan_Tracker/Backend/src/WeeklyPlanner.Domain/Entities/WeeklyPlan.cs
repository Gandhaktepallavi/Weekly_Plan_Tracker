namespace WeeklyPlanner.Domain.Entities;

public class WeeklyPlan
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public DateTime WeekStart { get; set; }

    public DateTime WeekEnd { get; set; }

    public bool IsFrozen { get; set; }

    public int ClientPercent { get; set; }

    public int TechDebtPercent { get; set; }

    public int RndPercent { get; set; }

    // List of team member IDs participating in this week's plan
    public List<string> SelectedMemberIds { get; set; } = new List<string>();

    // Navigation property
    public ICollection<TaskAssignment> TaskAssignments { get; set; } = new List<TaskAssignment>();
}
