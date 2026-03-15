using WeeklyPlanner.Application.Services;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Infrastructure.Services
{
    public class WeeklyPlanService : IWeeklyPlanService
    {
        private readonly WeeklyPlannerDbContext _context;

        public WeeklyPlanService(WeeklyPlannerDbContext context)
        {
            _context = context;
        }

        public WeeklyPlan CreatePlan(WeeklyPlan plan)
        {
            if (plan.TotalHours > 30)
                throw new Exception("Maximum 30 hours allowed");

            _context.WeeklyPlans.Add(plan);
            _context.SaveChanges();

            return plan;
        }

        public PlannedTask AddTask(PlannedTask task)
        {
            var plan = _context.WeeklyPlans.Find(task.WeeklyPlanId);

            if (plan == null)
                throw new Exception("Weekly plan not found");

            if (plan.IsFrozen)
                throw new Exception("Plan is frozen");

            _context.PlannedTasks.Add(task);
            _context.SaveChanges();

            return task;
        }

        public void LockPlan(int planId)
        {
            var plan = _context.WeeklyPlans.Find(planId);

            if (plan == null)
                throw new Exception("Weekly plan not found");

            plan.IsFrozen = true;

            _context.SaveChanges();
        }

        public void UpdateProgress(int taskId, int progress)
        {
            var task = _context.PlannedTasks.Find(taskId);

            if (task == null)
                throw new Exception("Task not found");

            task.Progress = progress;

            _context.SaveChanges();
        }
    }
}