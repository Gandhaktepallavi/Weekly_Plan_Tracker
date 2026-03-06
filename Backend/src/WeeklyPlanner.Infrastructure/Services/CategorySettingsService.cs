using WeeklyPlanner.Application.Services;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace WeeklyPlanner.Infrastructure.Services;

public class CategorySettingsService : ICategorySettingsService
{
    private readonly WeeklyPlannerDbContext _context;

    public CategorySettingsService(WeeklyPlannerDbContext context)
    {
        _context = context;
    }

    public CategorySettings? GetForWeek(DateTime weekStart)
    {
        var normalizedDate = GetTuesdayStart(weekStart);
        return _context.CategorySettings
            .FirstOrDefault(cs => cs.WeekStart.Date == normalizedDate.Date);
    }

    public CategorySettings GetCurrentWeekSettings()
    {
        var currentTuesday = GetTuesdayStart(DateTime.Today);
        var settings = _context.CategorySettings
            .FirstOrDefault(cs => cs.WeekStart.Date == currentTuesday.Date);

        if (settings == null)
        {
            settings = new CategorySettings
            {
                WeekStart = currentTuesday,
                ClientPercent = 50,
                TechDebtPercent = 30,
                RnDPercent = 20
            };
            _context.CategorySettings.Add(settings);
            _context.SaveChanges();
        }

        return settings;
    }

    public CategorySettings Save(CategorySettings settings)
    {
        var existing = _context.CategorySettings
            .FirstOrDefault(cs => cs.WeekStart.Date == settings.WeekStart.Date);

        if (existing != null)
        {
            existing.ClientPercent = settings.ClientPercent;
            existing.TechDebtPercent = settings.TechDebtPercent;
            existing.RnDPercent = settings.RnDPercent;
            existing.SetByUserId = settings.SetByUserId;
        }
        else
        {
            settings.Id = Guid.NewGuid().ToString();
            settings.CreatedAt = DateTime.UtcNow;
            _context.CategorySettings.Add(settings);
        }

        _context.SaveChanges();
        return settings;
    }

    public List<CategorySettings> GetAll()
    {
        return _context.CategorySettings
            .OrderByDescending(cs => cs.WeekStart)
            .ToList();
    }

    public bool ValidatePercentages(double clientPercent, double techDebtPercent, double rndPercent)
    {
        var total = clientPercent + techDebtPercent + rndPercent;
        return Math.Abs(total - 100.0) < 0.01;
    }

    private DateTime GetTuesdayStart(DateTime date)
    {
        int daysUntilTuesday = (2 - (int)date.DayOfWeek + 7) % 7;
        if (daysUntilTuesday == 0 && date.DayOfWeek != DayOfWeek.Tuesday)
        {
            daysUntilTuesday = 7;
        }
        return date.AddDays(daysUntilTuesday == 0 ? 0 : daysUntilTuesday).Date;
    }
}

