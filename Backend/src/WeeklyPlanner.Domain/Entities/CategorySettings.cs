namespace WeeklyPlanner.Domain.Entities;

/// <summary>
/// Represents the category allocation settings for a week's planning
/// Team lead sets percentages for Client, TechDebt, and R&D categories
/// </summary>
public class CategorySettings
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime WeekStart { get; set; }
    public double ClientPercent { get; set; }
    public double TechDebtPercent { get; set; }
    public double RnDPercent { get; set; }
    public string SetByUserId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

