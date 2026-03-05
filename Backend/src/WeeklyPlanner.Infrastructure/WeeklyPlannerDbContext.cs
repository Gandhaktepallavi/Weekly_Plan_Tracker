using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Infrastructure
{
    public class WeeklyPlannerDbContext : DbContext
    {
        public DbSet<BacklogItem> BacklogItems { get; set; } = null!;
        public DbSet<WeeklyPlan> WeeklyPlans { get; set; } = null!;
        public DbSet<PlannedTask> PlannedTasks { get; set; } = null!;

        public WeeklyPlannerDbContext(DbContextOptions<WeeklyPlannerDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BacklogItem>().HasKey(b => b.Id);
            modelBuilder.Entity<WeeklyPlan>().HasKey(p => p.Id);
            modelBuilder.Entity<PlannedTask>().HasKey(t => t.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}