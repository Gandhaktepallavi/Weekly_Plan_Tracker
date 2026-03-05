namespace WeeklyPlanner.Domain.Entities;

public class WeeklyPlan
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public DateTime WeekStart { get; set; }

    public bool IsFrozen { get; set; }

    public int ClientPercent { get; set; }

    public int TechDebtPercent { get; set; }

    public int RndPercent { get; set; }
}