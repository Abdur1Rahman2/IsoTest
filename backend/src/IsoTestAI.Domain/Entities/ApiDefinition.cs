namespace IsoTestAI.Domain.Entities;

public class ApiDefinition : BaseEntity
{
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? BaseUrl { get; set; }
    public string? OpenApiSpecUrl { get; set; }

    // Navigation properties
    public Project Project { get; set; } = null!;
    public ICollection<ApiEndpoint> Endpoints { get; set; } = new List<ApiEndpoint>();
}