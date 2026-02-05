using IsoTestAI.Application.Interfaces;
using IsoTestAI.Domain.Entities;
using IsoTestAI.Domain.Interfaces;

namespace IsoTestAI.Application.Services;

public class ProjectService : IProjectService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProjectService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Project?> GetProjectByIdAsync(Guid id)
    {
        return await _unitOfWork.Projects.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Project>> GetAllProjectsAsync()
    {
        return await _unitOfWork.Projects.GetAllAsync();
    }

    public async Task<IEnumerable<Project>> GetProjectsByUserIdAsync(Guid userId)
    {
        var projectMembers = await _unitOfWork.ProjectMembers.FindAsync(pm => pm.UserId == userId);
        var projectIds = projectMembers.Select(pm => pm.ProjectId);
        return await _unitOfWork.Projects.FindAsync(p => projectIds.Contains(p.Id));
    }

    public async Task<Project> CreateProjectAsync(Project project)
    {
        return await _unitOfWork.Projects.AddAsync(project);
    }

    public async Task<Project> UpdateProjectAsync(Project project)
    {
        await _unitOfWork.Projects.UpdateAsync(project);
        return project;
    }

    public async Task DeleteProjectAsync(Guid id)
    {
        var project = await _unitOfWork.Projects.GetByIdAsync(id);
        if (project != null)
        {
            await _unitOfWork.Projects.DeleteAsync(project);
        }
    }

    public async Task<bool> AddProjectMemberAsync(Guid projectId, Guid userId, string roleInProject)
    {
        var existingMember = await _unitOfWork.ProjectMembers
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

        if (existingMember != null)
            return false;

        var projectMember = new ProjectMember
        {
            ProjectId = projectId,
            UserId = userId,
            RoleInProject = roleInProject
        };

        await _unitOfWork.ProjectMembers.AddAsync(projectMember);
        return true;
    }

    public async Task<bool> RemoveProjectMemberAsync(Guid projectId, Guid userId)
    {
        var member = await _unitOfWork.ProjectMembers
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

        if (member == null)
            return false;

        await _unitOfWork.ProjectMembers.DeleteAsync(member);
        return true;
    }
}