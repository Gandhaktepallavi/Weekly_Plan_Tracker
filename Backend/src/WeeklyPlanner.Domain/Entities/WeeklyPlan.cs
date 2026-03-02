using System.Text.Json.Serialization;

namespace WeeklyPlanner.Domain.Entities
{
    public class WeeklyPlan
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public DateTime WeekStart { get; set; }      // ← ADD THIS
        public bool IsFrozen { get; set; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public CategoryPercentages CategoryPercentages { get; set; } = new();
    }

    public enum CategoryPercentages
    {
        Client, TechDebt, RnD
    }

    public class CategoryAllocation
    {
        public CategoryPercentages Category { get; set; }
        public double Percentage { get; set; }
    }
}
