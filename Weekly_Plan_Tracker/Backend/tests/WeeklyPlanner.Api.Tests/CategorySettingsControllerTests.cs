using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Api.Controllers;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Tests;

public class CategorySettingsControllerTests
{
    [Fact]
    public void Update_ReturnsBadRequest_WhenPercentagesDoNotAddToHundred()
    {
        var controller = new CategorySettingsController();
        var result = controller.Update(new CategorySettings
        {
            ClientFocusedPercent = 60,
            TechDebtPercent = 30,
            RnDPercent = 5
        });

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Category percentages must add up to 100.", badRequest.Value);
    }

    [Fact]
    public void Update_ReturnsOk_WhenPercentagesAreValid()
    {
        var controller = new CategorySettingsController();
        var result = controller.Update(new CategorySettings
        {
            ClientFocusedPercent = 50,
            TechDebtPercent = 30,
            RnDPercent = 20
        });

        var ok = Assert.IsType<OkObjectResult>(result);
        var payload = Assert.IsType<CategorySettings>(ok.Value);
        Assert.Equal(100, payload.ClientFocusedPercent + payload.TechDebtPercent + payload.RnDPercent);
    }
}
