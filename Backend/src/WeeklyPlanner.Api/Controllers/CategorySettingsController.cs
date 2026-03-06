using Microsoft.AspNetCore.Mvc;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Application.Services;

namespace WeeklyPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategorySettingsController : ControllerBase
{
    private readonly ICategorySettingsService _categorySettingsService;
    private readonly ILogger<CategorySettingsController> _logger;

    public CategorySettingsController(ICategorySettingsService categorySettingsService, ILogger<CategorySettingsController> logger)
    {
        _categorySettingsService = categorySettingsService;
        _logger = logger;
    }

    [HttpGet("current")]
    public ActionResult<CategorySettings> GetCurrentWeekSettings()
    {
        var settings = _categorySettingsService.GetCurrentWeekSettings();
        return Ok(settings);
    }

    [HttpGet]
    public ActionResult<CategorySettings> GetForWeek([FromQuery] DateTime weekStart)
    {
        var settings = _categorySettingsService.GetForWeek(weekStart);
        if (settings == null)
        {
            return NotFound("No settings found for this week");
        }
        return Ok(settings);
    }

    [HttpGet("history")]
    public ActionResult<IEnumerable<CategorySettings>> GetHistory()
    {
        var settings = _categorySettingsService.GetAll();
        return Ok(settings);
    }

    [HttpPost]
    public ActionResult<CategorySettings> Save(CategorySettings settings)
    {
        if (!_categorySettingsService.ValidatePercentages(
            settings.ClientPercent, 
            settings.TechDebtPercent, 
            settings.RnDPercent))
        {
            return BadRequest("Category percentages must sum to 100");
        }

        var saved = _categorySettingsService.Save(settings);
        _logger.LogInformation("Saved category settings for week {WeekStart}", settings.WeekStart);
        return Ok(saved);
    }

    [HttpGet("validate")]
    public ActionResult<bool> Validate([FromQuery] double client, [FromQuery] double techDebt, [FromQuery] double rnd)
    {
        var isValid = _categorySettingsService.ValidatePercentages(client, techDebt, rnd);
        return Ok(isValid);
    }
}

