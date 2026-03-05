using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/category-settings")]
    public class CategorySettingsController : ControllerBase
    {
        private static CategorySettings settings = new CategorySettings
        {
            ClientFocusedPercent = 50,
            TechDebtPercent = 30,
            RnDPercent = 20
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(settings);
        }

        [HttpPost]
        public IActionResult Update(CategorySettings newSettings)
        {
            settings = newSettings;
            return Ok(settings);
        }
    }
}

