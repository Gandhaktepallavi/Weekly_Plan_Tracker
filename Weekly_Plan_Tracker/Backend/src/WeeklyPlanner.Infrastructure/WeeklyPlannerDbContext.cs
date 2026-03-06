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
        public DbSet<TeamMember> TeamMembers { get; set; } = null!;
        
        public WeeklyPlannerDbContext(DbContextOptions<WeeklyPlannerDbContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure TaskAssignment relationships
            modelBuilder.Entity<TaskAssignment>(entity =>
            {
                entity.HasOne(t => t.TeamMember)
                    .WithMany(m => m.TaskAssignments)
                    .HasForeignKey(t => t.TeamMemberId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.BacklogItem)
                    .WithMany()
                    .HasForeignKey(t => t.BacklogItemId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.WeeklyPlan)
                    .WithMany(w => w.TaskAssignments)
                    .HasForeignKey(t => t.WeeklyPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure WeeklyPlan
            modelBuilder.Entity<WeeklyPlan>(entity =>
            {
                entity.HasKey(w => w.Id);
                entity.Property(w => w.SelectedMemberIds)
                    .HasConversion(
                        v => string.Join(',', v),
                        v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                    );
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
