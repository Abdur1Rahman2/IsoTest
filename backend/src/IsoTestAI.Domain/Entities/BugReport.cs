namespace IsoTestAI.Domain.Entities;

public class BugReport : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Guid? TestExecutionId { get; set; }
    public string Severity { get; set; } = "Medium"; // Low | Medium | High | Critical
    public string Status { get; set; } = "Open"; // Open | In Progress | Resolved | Closed
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? StepsToReproduce { get; set; }
    public string? AiGeneratedSummary { get; set; }
    public Guid? CreatedBy { get; set; }

    // Navigation properties
    public Project Project { get; set; } = null!;
    public TestExecution? TestExecution { get; set; }
    public User? Creator { get; set; }
}