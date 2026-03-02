namespace WeeklyPlanner.Domain.Entities;
public class BacklogItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public string? Description { get; set; }
    public Category Category { get; set; }
    public double EstimatedHours { get; set; }
}

public enum Category { Client, TechDebt, RnD }
