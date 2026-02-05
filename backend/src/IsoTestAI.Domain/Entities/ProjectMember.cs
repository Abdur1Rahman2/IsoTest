namespace IsoTestAI.Domain.Entities;

public class ProjectMember
{
    public Guid ProjectId { get; set; }
    public Guid UserId { get; set; }
    public string RoleInProject { get; set; } = string.Empty; // 'Project Manager' | 'Developer' | 'QA Planner'

    // Navigation properties
    public Project Project { get; set; } = null!;
    public User User { get; set; } = null!;
}