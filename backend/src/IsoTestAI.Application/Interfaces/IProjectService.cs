using IsoTestAI.Domain.Entities;

namespace IsoTestAI.Application.Interfaces;

public interface IProjectService
{
    Task<Project?> GetProjectByIdAsync(Guid id);
    Task<IEnumerable<Project>> GetAllProjectsAsync();
    Task<IEnumerable<Project>> GetProjectsByUserIdAsync(Guid userId);
    Task<Project> CreateProjectAsync(Project project);
    Task<Project> UpdateProjectAsync(Project project);
    Task DeleteProjectAsync(Guid id);
    Task<bool> AddProjectMemberAsync(Guid projectId, Guid userId, string roleInProject);
    Task<bool> RemoveProjectMemberAsync(Guid projectId, Guid userId);
}