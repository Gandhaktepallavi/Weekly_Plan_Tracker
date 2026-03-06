using WeeklyPlanner.Application.Services;
using WeeklyPlanner.Domain.Entities;
using WeeklyPlanner.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace WeeklyPlanner.Infrastructure.Services;

/// <summary>
/// Implementation of team member service
/// </summary>
public class TeamMemberService : ITeamMemberService
{
    private readonly WeeklyPlannerDbContext _context;

    public TeamMemberService(WeeklyPlannerDbContext context)
    {
        _context = context;
    }

    public List<TeamMember> GetAll()
    {
        return _context.TeamMembers
            .Where(tm => tm.IsActive)
            .OrderBy(tm => tm.Name)
            .ToList();
    }

    public List<TeamMember> GetAllIncludingInactive()
    {
        return _context.TeamMembers
            .OrderBy(tm => tm.Name)
            .ToList();
    }

    public TeamMember? GetById(string id)
    {
        return _context.TeamMembers.Find(id);
    }

    public TeamMember Add(TeamMember member)
    {
        member.Id = Guid.NewGuid().ToString();
        member.CreatedAt = DateTime.UtcNow;
        
        // If this is the first member, make them team lead
        var firstMemberId = _context.TeamMembers
            .Select(tm => tm.Id)
            .FirstOrDefault();
        if (string.IsNullOrWhiteSpace(firstMemberId))
        {
            member.IsTeamLead = true;
        }
        
        _context.TeamMembers.Add(member);
        _context.SaveChanges();
        
        return member;
    }

    public TeamMember? Update(TeamMember member)
    {
        var existing = _context.TeamMembers.Find(member.Id);
        if (existing == null) return null;

        existing.Name = member.Name;
        existing.IsTeamLead = member.IsTeamLead;
        existing.IsActive = member.IsActive;
        
        _context.SaveChanges();
        return existing;
    }

    public bool Delete(string id)
    {
        var member = _context.TeamMembers.Find(id);
        if (member == null) return false;

        // Soft delete - just mark as inactive
        member.IsActive = false;
        _context.SaveChanges();
        return true;
    }

    public bool SetAsTeamLead(string id)
    {
        var member = _context.TeamMembers.Find(id);
        if (member == null) return false;

        // Remove team lead from all others
        var allMembers = _context.TeamMembers.ToList();
        foreach (var m in allMembers)
        {
            m.IsTeamLead = false;
        }

        member.IsTeamLead = true;
        _context.SaveChanges();
        return true;
    }

    public TeamMember? GetTeamLead()
    {
        return _context.TeamMembers
            .FirstOrDefault(tm => tm.IsTeamLead && tm.IsActive);
    }
}

