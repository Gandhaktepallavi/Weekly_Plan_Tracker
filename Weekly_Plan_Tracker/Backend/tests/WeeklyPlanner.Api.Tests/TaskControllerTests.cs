using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Api.Controllers;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Tests;

public class TaskControllerTests
{
    [Fact]
    public async Task AssignTask_ReturnsBadRequest_WhenAssignmentExceedsThirtyHours()
    {
        await using var context = TestDbContextFactory.Create();
        context.TeamMembers.Add(new TeamMember { Id = "m1", Name = "Member", IsActive = true });
        context.BacklogItems.AddRange(
            new BacklogItem { Id = "b1", Title = "B1", Category = Category.Client, EstimatedHours = 25 },
            new BacklogItem { Id = "b2", Title = "B2", Category = Category.TechDebt, EstimatedHours = 10 });
        context.WeeklyPlans.Add(new WeeklyPlan { Id = "p1", WeekStart = DateTime.Today, WeekEnd = DateTime.Today.AddDays(6) });
        context.TaskAssignments.Add(new TaskAssignment
        {
            Id = "t1",
            WeeklyPlanId = "p1",
            TeamMemberId = "m1",
            BacklogItemId = "b1",
            AssignedHours = 25
        });
        await context.SaveChangesAsync();

        var controller = new TaskController(context);
        var result = await controller.AssignTask(new TaskAssignment
        {
            WeeklyPlanId = "p1",
            TeamMemberId = "m1",
            BacklogItemId = "b2",
            AssignedHours = 10
        });

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Total planned hours cannot exceed 30.", badRequest.Value);
    }

    [Fact]
    public async Task AssignTask_ReturnsBadRequest_WhenBacklogAlreadyAssignedForPlan()
    {
        await using var context = TestDbContextFactory.Create();
        context.TeamMembers.AddRange(
            new TeamMember { Id = "m1", Name = "Member1", IsActive = true },
            new TeamMember { Id = "m2", Name = "Member2", IsActive = true });
        context.BacklogItems.Add(new BacklogItem { Id = "b1", Title = "B1", Category = Category.Client, EstimatedHours = 10 });
        context.WeeklyPlans.Add(new WeeklyPlan { Id = "p1", WeekStart = DateTime.Today, WeekEnd = DateTime.Today.AddDays(6) });
        context.TaskAssignments.Add(new TaskAssignment
        {
            Id = "t1",
            WeeklyPlanId = "p1",
            TeamMemberId = "m1",
            BacklogItemId = "b1",
            AssignedHours = 10
        });
        await context.SaveChangesAsync();

        var controller = new TaskController(context);
        var result = await controller.AssignTask(new TaskAssignment
        {
            WeeklyPlanId = "p1",
            TeamMemberId = "m2",
            BacklogItemId = "b1",
            AssignedHours = 10
        });

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Backlog item is already assigned in this weekly plan.", badRequest.Value);
    }
}
