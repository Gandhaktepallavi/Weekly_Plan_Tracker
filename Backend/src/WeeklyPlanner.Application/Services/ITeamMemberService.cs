using WeeklyPlanner.Domain.Entities;

namespace WeeklyPlanner.Application.Services;

/// <summary>
/// Service interface for team member operations
/// </summary>
public interface ITeamMemberService
{
    /// <summary>
    /// Gets all active team members
    /// </summary>
    List<TeamMember> GetAll();

    /// <summary>
    /// Gets all team members including inactive ones
    /// </summary>
    List<TeamMember> GetAllIncludingInactive();

    /// <summary>
    /// Gets a team member by ID
    /// </summary>
    TeamMember? GetById(string id);

    /// <summary>
    /// Adds a new team member
    /// </summary>
    TeamMember Add(TeamMember member);

    /// <summary>
    /// Updates an existing team member
    /// </summary>
    TeamMember? Update(TeamMember member);

    /// <summary>
    /// Removes a team member by ID
    /// </summary>
    bool Delete(string id);

    /// <summary>
    /// Sets a team member as team lead
    /// </summary>
    bool SetAsTeamLead(string id);

    /// <summary>
    /// Gets the current team lead
    /// </summary>
    TeamMember? GetTeamLead();
}

