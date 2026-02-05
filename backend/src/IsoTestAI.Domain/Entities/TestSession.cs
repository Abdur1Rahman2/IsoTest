namespace IsoTestAI.Domain.Entities;

public class TestSession : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Guid? EnvironmentConfigId { get; set; }
    public Guid? TriggeredBy { get; set; }
    public string Source { get; set; } = "ui"; // ui | cicd | api
    public string Status { get; set; } = "running"; // running | passed | failed | error | cancelled
    public int TotalTests { get; set; } = 0;
    public int PassedTests { get; set; } = 0;
    public int FailedTests { get; set; } = 0;
    public int ErrorTests { get; set; } = 0;
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public string? Notes { get; set; }

    // Navigation properties
    public Project Project { get; set; } = null!;
    public EnvironmentConfig? EnvironmentConfig { get; set; }
    public User? Trigger { get; set; }
    public ICollection<TestExecution> Executions { get; set; } = new List<TestExecution>();
}