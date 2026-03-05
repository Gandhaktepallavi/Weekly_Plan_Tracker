namespace WeeklyPlanner.Domain.Entities
{
    public class CategorySettings
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public int ClientFocusedPercent { get; set; }
        public int TechDebtPercent { get; set; }
        public int RnDPercent { get; set; }
    }
}

