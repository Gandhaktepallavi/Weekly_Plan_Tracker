using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/category-settings")]
public class CategorySettingsController : ControllerBase
{
    private static CategorySettings settings = CreateDefaults();

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(settings);
        }

    [HttpPost]
    public IActionResult Update(CategorySettings newSettings)
        {
            if (newSettings.ClientFocusedPercent < 0 ||
                newSettings.TechDebtPercent < 0 ||
                newSettings.RnDPercent < 0)
            {
                return BadRequest("Percentages cannot be negative.");
            }

            if (newSettings.ClientFocusedPercent + newSettings.TechDebtPercent + newSettings.RnDPercent != 100)
            {
                return BadRequest("Category percentages must add up to 100.");
            }

        settings = newSettings;
        return Ok(settings);
    }

    public static void ResetDefaults()
    {
        settings = CreateDefaults();
    }

    private static CategorySettings CreateDefaults()
    {
        return new CategorySettings
        {
            ClientFocusedPercent = 50,
            TechDebtPercent = 30,
            RnDPercent = 20
        };
    }
}
}

