namespace IsoTestAI.Domain.Entities;

public class TestExecution : BaseEntity
{
    public Guid SessionId { get; set; }
    public Guid TestCaseId { get; set; }
    public string Status { get; set; } = string.Empty; // passed | failed | error | skipped
    public int? ExecutionTimeMs { get; set; }
    public int? ResponseStatus { get; set; }
    public string? ResponseData { get; set; } // JSONB stored as string
    public string? ErrorMessage { get; set; }
    public DateTime ExecutedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public TestSession Session { get; set; } = null!;
    public TestCase TestCase { get; set; } = null!;
    public ICollection<BugReport> BugReports { get; set; } = new List<BugReport>();
}