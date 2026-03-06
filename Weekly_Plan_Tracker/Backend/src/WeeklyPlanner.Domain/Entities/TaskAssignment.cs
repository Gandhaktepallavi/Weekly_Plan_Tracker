namespace WeeklyPlanner.Domain.Entities
{
    public class TaskAssignment
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string TeamMemberId { get; set; } = string.Empty;

        public string BacklogItemId { get; set; } = string.Empty;

        public string WeeklyPlanId { get; set; } = string.Empty;

        public int AssignedHours { get; set; }

        public int ProgressPercent { get; set; } = 0;

        // Navigation properties
        public TeamMember? TeamMember { get; set; }
        public BacklogItem? BacklogItem { get; set; }
        public WeeklyPlan? WeeklyPlan { get; set; }
    }
}
