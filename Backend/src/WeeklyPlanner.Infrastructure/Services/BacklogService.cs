using WeeklyPlanner.Application.Services;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;

namespace WeeklyPlanner.Infrastructure.Services
{
    public class BacklogService : IBacklogService
    {
        private readonly WeeklyPlannerDbContext _context;

        public BacklogService(WeeklyPlannerDbContext context)
        {
            _context = context;
        }

        public List<BacklogItem> GetAll()
        {
            return _context.BacklogItems.ToList();
        }

        public BacklogItem Add(BacklogItem item)
        {
            _context.BacklogItems.Add(item);
            _context.SaveChanges();
            return item;
        }

        public void Delete(int id)
        {
            var item = _context.BacklogItems.Find(id);

            if (item != null)
            {
                _context.BacklogItems.Remove(item);
                _context.SaveChanges();
            }
        }
    }
}