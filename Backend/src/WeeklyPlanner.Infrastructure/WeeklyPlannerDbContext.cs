using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Infrastructure
{
    public class WeeklyPlannerDbContext : DbContext
    {
        public DbSet<BacklogItem> BacklogItems { get; set; } = null!;
        public DbSet<WeeklyPlan> WeeklyPlans { get; set; } = null!;
        public DbSet<PlannedTask> PlannedTasks { get; set; } = null!;
        public DbSet<TaskAssignment> TaskAssignments { get; set; } = null!;

        public WeeklyPlannerDbContext(DbContextOptions<WeeklyPlannerDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // CosmosDB: each entity needs a container and a partition key
            modelBuilder.Entity<BacklogItem>()
                .ToContainer("BacklogItems")
                .HasPartitionKey(e => e.Id);

            modelBuilder.Entity<WeeklyPlan>()
                .ToContainer("WeeklyPlans")
                .HasPartitionKey(e => e.Id);

            modelBuilder.Entity<PlannedTask>()
                .ToContainer("PlannedTasks")
                .HasPartitionKey(e => e.Id);

            modelBuilder.Entity<TaskAssignment>()
                .ToContainer("TaskAssignments")
                .HasPartitionKey(e => e.Id);
        }
    }
}
