namespace IsoTestAI.Domain.Entities;

public class CicdPipeline : BaseEntity
{
    public Guid ProjectId { get; set; }
    public string Provider { get; set; } = string.Empty; // GitHub, GitLab, Azure DevOps, etc.
    public string RepositoryUrl { get; set; } = string.Empty;
    public string Branch { get; set; } = "main";
    public string? WebhookUrl { get; set; }
    public string? WebhookSecret { get; set; }
    public bool IsActive { get; set; } = true;
    public string? LastRunStatus { get; set; }
    public DateTime? LastRunAt { get; set; }

    // Navigation properties
    public Project Project { get; set; } = null!;
}