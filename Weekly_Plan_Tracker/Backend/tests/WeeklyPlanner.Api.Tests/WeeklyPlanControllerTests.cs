using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Api.Controllers;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Tests;

public class WeeklyPlanControllerTests
{
    [Fact]
    public async Task Freeze_ReturnsBadRequest_WhenAnySelectedMemberDoesNotHaveThirtyHours()
    {
        await using var context = TestDbContextFactory.Create();
        var member1 = new TeamMember { Id = "m1", Name = "A", IsActive = true };
        var member2 = new TeamMember { Id = "m2", Name = "B", IsActive = true };
        var b1 = new BacklogItem { Id = "b1", Title = "B1", Category = Category.Client, EstimatedHours = 15 };
        var b2 = new BacklogItem { Id = "b2", Title = "B2", Category = Category.TechDebt, EstimatedHours = 15 };
        var plan = new WeeklyPlan
        {
            Id = "p1",
            WeekStart = DateTime.Today,
            WeekEnd = DateTime.Today.AddDays(6),
            ClientPercent = 50,
            TechDebtPercent = 50,
            RndPercent = 0,
            SelectedMemberIds = new List<string> { member1.Id, member2.Id }
        };

        context.TeamMembers.AddRange(member1, member2);
        context.BacklogItems.AddRange(b1, b2);
        context.WeeklyPlans.Add(plan);
        context.TaskAssignments.AddRange(
            new TaskAssignment { Id = "t1", WeeklyPlanId = plan.Id, TeamMemberId = member1.Id, BacklogItemId = b1.Id, AssignedHours = 15 },
            new TaskAssignment { Id = "t2", WeeklyPlanId = plan.Id, TeamMemberId = member1.Id, BacklogItemId = b2.Id, AssignedHours = 15 },
            new TaskAssignment { Id = "t3", WeeklyPlanId = plan.Id, TeamMemberId = member2.Id, BacklogItemId = b1.Id, AssignedHours = 20 });
        await context.SaveChangesAsync();

        var controller = new WeeklyPlanController(context);
        var result = await controller.Freeze(plan.Id);

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Contains("exactly 30 planned hours", badRequest.Value?.ToString(), StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task Freeze_ReturnsBadRequest_WhenCategoryAllocationDoesNotMatchPercentages()
    {
        await using var context = TestDbContextFactory.Create();
        var member = new TeamMember { Id = "m1", Name = "A", IsActive = true };
        var backlog = new BacklogItem { Id = "b1", Title = "B1", Category = Category.Client, EstimatedHours = 30 };
        var plan = new WeeklyPlan
        {
            Id = "p1",
            WeekStart = DateTime.Today,
            WeekEnd = DateTime.Today.AddDays(6),
            ClientPercent = 50,
            TechDebtPercent = 30,
            RndPercent = 20,
            SelectedMemberIds = new List<string> { member.Id }
        };

        context.TeamMembers.Add(member);
        context.BacklogItems.Add(backlog);
        context.WeeklyPlans.Add(plan);
        context.TaskAssignments.Add(new TaskAssignment
        {
            Id = "t1",
            WeeklyPlanId = plan.Id,
            TeamMemberId = member.Id,
            BacklogItemId = backlog.Id,
            AssignedHours = 30
        });
        await context.SaveChangesAsync();

        var controller = new WeeklyPlanController(context);
        var result = await controller.Freeze(plan.Id);

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Contains("Category hour allocation mismatch", badRequest.Value?.ToString(), StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task Freeze_ReturnsOk_WhenPlanMeetsAllRules()
    {
        await using var context = TestDbContextFactory.Create();
        var member = new TeamMember { Id = "m1", Name = "A", IsActive = true };
        var b1 = new BacklogItem { Id = "b1", Title = "B1", Category = Category.Client, EstimatedHours = 15 };
        var b2 = new BacklogItem { Id = "b2", Title = "B2", Category = Category.TechDebt, EstimatedHours = 9 };
        var b3 = new BacklogItem { Id = "b3", Title = "B3", Category = Category.RnD, EstimatedHours = 6 };
        var plan = new WeeklyPlan
        {
            Id = "p1",
            WeekStart = DateTime.Today,
            WeekEnd = DateTime.Today.AddDays(6),
            ClientPercent = 50,
            TechDebtPercent = 30,
            RndPercent = 20,
            SelectedMemberIds = new List<string> { member.Id }
        };

        context.TeamMembers.Add(member);
        context.BacklogItems.AddRange(b1, b2, b3);
        context.WeeklyPlans.Add(plan);
        context.TaskAssignments.AddRange(
            new TaskAssignment { Id = "t1", WeeklyPlanId = plan.Id, TeamMemberId = member.Id, BacklogItemId = b1.Id, AssignedHours = 15 },
            new TaskAssignment { Id = "t2", WeeklyPlanId = plan.Id, TeamMemberId = member.Id, BacklogItemId = b2.Id, AssignedHours = 9 },
            new TaskAssignment { Id = "t3", WeeklyPlanId = plan.Id, TeamMemberId = member.Id, BacklogItemId = b3.Id, AssignedHours = 6 });
        await context.SaveChangesAsync();

        var controller = new WeeklyPlanController(context);
        var result = await controller.Freeze(plan.Id);

        Assert.IsType<OkObjectResult>(result);
        Assert.True(context.WeeklyPlans.Single().IsFrozen);
    }
}
