namespace IsoTestAI.Domain.Entities;

public class ApiEndpoint : BaseEntity
{
    public Guid ApiId { get; set; }
    public string Path { get; set; } = string.Empty;
    public string Method { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public bool IsCritical { get; set; } = false;

    // Navigation properties
    public ApiDefinition Api { get; set; } = null!;
    public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
}