namespace IsoTestAI.Domain.Entities;

public class UserSetting : BaseEntity
{
    public Guid UserId { get; set; }
    public bool DarkMode { get; set; } = false;
    public int DefaultTimeoutSeconds { get; set; } = 300;

    // Navigation properties
    public User User { get; set; } = null!;
}