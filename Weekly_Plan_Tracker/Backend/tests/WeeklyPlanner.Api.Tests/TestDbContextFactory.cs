using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Api.Tests;

internal static class TestDbContextFactory
{
    public static WeeklyPlannerDbContext Create()
    {
        var options = new DbContextOptionsBuilder<WeeklyPlannerDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new WeeklyPlannerDbContext(options);
    }
}
