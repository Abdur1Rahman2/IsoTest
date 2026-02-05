namespace IsoTestAI.Domain.Entities;

public class Project : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = "Active"; // Active | Pending | Completed
    public int ApiCount { get; set; } = 0;
    public string? Features { get; set; }
    public Guid? CreatedBy { get; set; }

    // Navigation properties
    public User? Creator { get; set; }
    public ICollection<ProjectMember> Members { get; set; } = new List<ProjectMember>();
    public ICollection<ApiDefinition> ApiDefinitions { get; set; } = new List<ApiDefinition>();
    public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
    public ICollection<EnvironmentConfig> EnvironmentConfigs { get; set; } = new List<EnvironmentConfig>();
    public ICollection<TestSession> TestSessions { get; set; } = new List<TestSession>();
    public ICollection<BugReport> BugReports { get; set; } = new List<BugReport>();
    public ICollection<CicdPipeline> CicdPipelines { get; set; } = new List<CicdPipeline>();
}