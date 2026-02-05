namespace IsoTestAI.Domain.Entities;

public class TestCase : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Guid? EndpointId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? EndpointPath { get; set; }
    public string? Method { get; set; }
    public bool GeneratedByAi { get; set; } = false;
    public string? TestData { get; set; } // JSONB stored as string
    public int? ExpectedStatus { get; set; }
    public Guid? CreatedBy { get; set; }

    // Navigation properties
    public Project Project { get; set; } = null!;
    public ApiEndpoint? Endpoint { get; set; }
    public User? Creator { get; set; }
    public ICollection<TestExecution> Executions { get; set; } = new List<TestExecution>();
}