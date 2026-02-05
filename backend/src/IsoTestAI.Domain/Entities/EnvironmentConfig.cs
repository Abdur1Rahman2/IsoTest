namespace IsoTestAI.Domain.Entities;

public class EnvironmentConfig : BaseEntity
{
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string EnvironmentType { get; set; } = "ephemeral"; // ephemeral / shared / staging
    public string? DatabaseEngine { get; set; }
    public string? DatabaseVersion { get; set; }
    public string? IsolationLevel { get; set; }
    public string? ContainerImage { get; set; }
    public string? CpuLimit { get; set; }
    public string? MemoryLimit { get; set; }
    public Guid? CreatedBy { get; set; }

    // Navigation properties
    public Project Project { get; set; } = null!;
    public User? Creator { get; set; }
    public ICollection<TestSession> TestSessions { get; set; } = new List<TestSession>();
}