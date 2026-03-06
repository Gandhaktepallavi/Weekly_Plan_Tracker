namespace WeeklyPlanner.Domain.Entities
{
    public class PlannedTask
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string WeeklyPlanId { get; set; } = string.Empty;
        public string BacklogItemId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public double PlannedHours { get; set; }
        public double CompletedHours { get; set; }
    }
}
