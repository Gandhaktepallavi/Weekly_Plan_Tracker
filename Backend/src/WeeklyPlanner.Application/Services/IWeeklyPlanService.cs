using WeeklyPlanner.Domain.Entities;

public interface IWeeklyPlanService
{
    WeeklyPlan CreatePlan(WeeklyPlan plan);

    PlannedTask AddTask(PlannedTask task);

    void LockPlan(int planId);

    void UpdateProgress(int taskId, int progress);
}