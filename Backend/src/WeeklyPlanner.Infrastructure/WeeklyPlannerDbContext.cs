using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Infrastructure
{
    public class WeeklyPlannerDbContext : DbContext
    {
        public DbSet<BacklogItem> BacklogItems { get; set; } = null!;
        public DbSet<WeeklyPlan> WeeklyPlans { get; set; } = null!;
        public DbSet<PlannedTask> PlannedTasks { get; set; } = null!;
        public DbSet<TaskAssignment> TaskAssignments { get; set; }
        public WeeklyPlannerDbContext(DbContextOptions<WeeklyPlannerDbContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Minimal Cosmos config - let EF auto-handle containers
            base.OnModelCreating(modelBuilder);
        }
    }
}
