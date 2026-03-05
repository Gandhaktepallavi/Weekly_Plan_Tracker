using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Application.Services
{
    public interface IBacklogService
    {
        List<BacklogItem> GetAll();

        BacklogItem Add(BacklogItem item);

        void Delete(int id);
    }
}