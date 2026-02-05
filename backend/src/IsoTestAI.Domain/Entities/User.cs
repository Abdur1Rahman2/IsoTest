namespace IsoTestAI.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty; // 'Project Manager' | 'Developer' | 'QA Planner'

    // Navigation properties
    public UserSetting? UserSetting { get; set; }
    public ICollection<Project> CreatedProjects { get; set; } = new List<Project>();
    public ICollection<ProjectMember> ProjectMemberships { get; set; } = new List<ProjectMember>();
    public ICollection<TestCase> CreatedTestCases { get; set; } = new List<TestCase>();
    public ICollection<TestSession> TriggeredSessions { get; set; } = new List<TestSession>();
    public ICollection<BugReport> CreatedBugReports { get; set; } = new List<BugReport>();
    public ICollection<EnvironmentConfig> CreatedEnvironmentConfigs { get; set; } = new List<EnvironmentConfig>();
}