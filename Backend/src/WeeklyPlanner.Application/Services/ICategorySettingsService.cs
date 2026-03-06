using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Application.Services;

/// <summary>
/// Service interface for category settings operations
/// </summary>
public interface ICategorySettingsService
{
    /// <summary>
    /// Gets category settings for a specific week
    /// </summary>
    CategorySettings? GetForWeek(DateTime weekStart);

    /// <summary>
    /// Gets category settings for the current week (starting Tuesday)
    /// </summary>
    CategorySettings GetCurrentWeekSettings();

    /// <summary>
    /// Saves or updates category settings for a week
    /// </summary>
    CategorySettings Save(CategorySettings settings);

    /// <summary>
    /// Gets all category settings history
    /// </summary>
    List<CategorySettings> GetAll();

    /// <summary>
    /// Validates that percentages sum to 100
    /// </summary>
    bool ValidatePercentages(double clientPercent, double techDebtPercent, double rndPercent);
}

