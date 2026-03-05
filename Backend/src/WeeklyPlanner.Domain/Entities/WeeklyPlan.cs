using System.Text.Json.Serialization;

namespace WeeklyPlanner.Domain.Entities
{
    public class WeeklyPlan
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string UserName { get; set; } = "";   // ✅ ADD THIS

        public DateTime WeekStart { get; set; }
        public int TotalHours { get; set; }   // ← ADD THIS

        public bool IsFrozen { get; set; }

        public List<CategoryAllocation> CategoryAllocations { get; set; } = new();
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CategoryType
    {
        Client,
        TechDebt,
        RnD
    }

    public class CategoryAllocation
    {
        public CategoryType Category { get; set; }

        public double Percentage { get; set; }
    }
}