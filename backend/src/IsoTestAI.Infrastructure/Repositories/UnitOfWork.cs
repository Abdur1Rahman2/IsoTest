using Microsoft.EntityFrameworkCore.Storage;
using IsoTestAI.Domain.Entities;
using IsoTestAI.Domain.Interfaces;
using IsoTestAI.Infrastructure.Data;

namespace IsoTestAI.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly IsoTestAIDbContext _context;
    private IDbContextTransaction? _transaction;

    public UnitOfWork(IsoTestAIDbContext context)
    {
        _context = context;
        Users = new Repository<User>(_context);
        UserSettings = new Repository<UserSetting>(_context);
        Projects = new Repository<Project>(_context);
        ProjectMembers = new Repository<ProjectMember>(_context);
        ApiDefinitions = new Repository<ApiDefinition>(_context);
        ApiEndpoints = new Repository<ApiEndpoint>(_context);
        TestCases = new Repository<TestCase>(_context);
        EnvironmentConfigs = new Repository<EnvironmentConfig>(_context);
        TestSessions = new Repository<TestSession>(_context);
        TestExecutions = new Repository<TestExecution>(_context);
        BugReports = new Repository<BugReport>(_context);
        CicdPipelines = new Repository<CicdPipeline>(_context);
    }

    public IRepository<User> Users { get; }
    public IRepository<UserSetting> UserSettings { get; }
    public IRepository<Project> Projects { get; }
    public IRepository<ProjectMember> ProjectMembers { get; }
    public IRepository<ApiDefinition> ApiDefinitions { get; }
    public IRepository<ApiEndpoint> ApiEndpoints { get; }
    public IRepository<TestCase> TestCases { get; }
    public IRepository<EnvironmentConfig> EnvironmentConfigs { get; }
    public IRepository<TestSession> TestSessions { get; }
    public IRepository<TestExecution> TestExecutions { get; }
    public IRepository<BugReport> BugReports { get; }
    public IRepository<CicdPipeline> CicdPipelines { get; }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        _transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
    }

    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_transaction != null)
        {
            await _transaction.CommitAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_transaction != null)
        {
            await _transaction.RollbackAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public void Dispose()
    {
        _transaction?.Dispose();
        _context.Dispose();
    }
}