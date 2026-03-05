namespace WeeklyPlanner.Domain.Entities;

public class TaskAssignment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string TeamMemberId { get; set; }

    public string BacklogItemId { get; set; }

    public int PlannedHours { get; set; }

    public int ProgressPercent { get; set; }
}