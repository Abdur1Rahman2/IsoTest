using IsoTestAI.Domain.Entities;

namespace IsoTestAI.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IRepository<User> Users { get; }
    IRepository<UserSetting> UserSettings { get; }
    IRepository<Project> Projects { get; }
    IRepository<ProjectMember> ProjectMembers { get; }
    IRepository<ApiDefinition> ApiDefinitions { get; }
    IRepository<ApiEndpoint> ApiEndpoints { get; }
    IRepository<TestCase> TestCases { get; }
    IRepository<EnvironmentConfig> EnvironmentConfigs { get; }
    IRepository<TestSession> TestSessions { get; }
    IRepository<TestExecution> TestExecutions { get; }
    IRepository<BugReport> BugReports { get; }
    IRepository<CicdPipeline> CicdPipelines { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    Task BeginTransactionAsync(CancellationToken cancellationToken = default);
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);
    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
}