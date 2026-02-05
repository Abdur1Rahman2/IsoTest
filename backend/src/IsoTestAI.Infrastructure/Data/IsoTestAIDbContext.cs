using Microsoft.EntityFrameworkCore;
using IsoTestAI.Domain.Entities;

namespace IsoTestAI.Infrastructure.Data;

public class IsoTestAIDbContext : DbContext
{
    public IsoTestAIDbContext(DbContextOptions<IsoTestAIDbContext> options) 
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<UserSetting> UserSettings => Set<UserSetting>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectMember> ProjectMembers => Set<ProjectMember>();
    public DbSet<ApiDefinition> ApiDefinitions => Set<ApiDefinition>();
    public DbSet<ApiEndpoint> ApiEndpoints => Set<ApiEndpoint>();
    public DbSet<TestCase> TestCases => Set<TestCase>();
    public DbSet<EnvironmentConfig> EnvironmentConfigs => Set<EnvironmentConfig>();
    public DbSet<TestSession> TestSessions => Set<TestSession>();
    public DbSet<TestExecution> TestExecutions => Set<TestExecution>();
    public DbSet<BugReport> BugReports => Set<BugReport>();
    public DbSet<CicdPipeline> CicdPipelines => Set<CicdPipeline>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all configurations
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(IsoTestAIDbContext).Assembly);

        // Configure table names to match SQL schema (snake_case)
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<UserSetting>().ToTable("user_settings");
        modelBuilder.Entity<Project>().ToTable("projects");
        modelBuilder.Entity<ProjectMember>().ToTable("project_members");
        modelBuilder.Entity<ApiDefinition>().ToTable("api_definitions");
        modelBuilder.Entity<ApiEndpoint>().ToTable("api_endpoints");
        modelBuilder.Entity<TestCase>().ToTable("test_cases");
        modelBuilder.Entity<EnvironmentConfig>().ToTable("environment_configs");
        modelBuilder.Entity<TestSession>().ToTable("test_sessions");
        modelBuilder.Entity<TestExecution>().ToTable("test_executions");
        modelBuilder.Entity<BugReport>().ToTable("bug_reports");
        modelBuilder.Entity<CicdPipeline>().ToTable("cicd_pipelines");

        // Configure column names to match SQL schema (snake_case)
        ConfigureColumnNames(modelBuilder);
        
        // Configure relationships and keys
        ConfigureRelationships(modelBuilder);
    }

    private void ConfigureColumnNames(ModelBuilder modelBuilder)
    {
        // BaseEntity columns for all entities
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var idProperty = entityType.FindProperty("Id");
            if (idProperty != null)
                modelBuilder.Entity(entityType.ClrType).Property("Id").HasColumnName("id");

            var createdAtProperty = entityType.FindProperty("CreatedAt");
            if (createdAtProperty != null)
                modelBuilder.Entity(entityType.ClrType).Property("CreatedAt").HasColumnName("created_at");

            var updatedAtProperty = entityType.FindProperty("UpdatedAt");
            if (updatedAtProperty != null)
                modelBuilder.Entity(entityType.ClrType).Property("UpdatedAt").HasColumnName("updated_at");
        }

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.DisplayName).HasColumnName("display_name");
            entity.Property(e => e.Role).HasColumnName("role");
        });

        // UserSetting
        modelBuilder.Entity<UserSetting>(entity =>
        {
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.DarkMode).HasColumnName("dark_mode");
            entity.Property(e => e.DefaultTimeoutSeconds).HasColumnName("default_timeout_seconds");
        });

        // Project
        modelBuilder.Entity<Project>(entity =>
        {
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.ApiCount).HasColumnName("api_count");
            entity.Property(e => e.Features).HasColumnName("features");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
        });

        // ProjectMember
        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.RoleInProject).HasColumnName("role_in_project");
        });

        // ApiDefinition
        modelBuilder.Entity<ApiDefinition>(entity =>
        {
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.BaseUrl).HasColumnName("base_url");
            entity.Property(e => e.OpenApiSpecUrl).HasColumnName("openapi_spec_url");
        });

        // ApiEndpoint
        modelBuilder.Entity<ApiEndpoint>(entity =>
        {
            entity.Property(e => e.ApiId).HasColumnName("api_id");
            entity.Property(e => e.Path).HasColumnName("path");
            entity.Property(e => e.Method).HasColumnName("method");
            entity.Property(e => e.Summary).HasColumnName("summary");
            entity.Property(e => e.IsCritical).HasColumnName("is_critical");
        });

        // TestCase
        modelBuilder.Entity<TestCase>(entity =>
        {
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.EndpointId).HasColumnName("endpoint_id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EndpointPath).HasColumnName("endpoint_path");
            entity.Property(e => e.Method).HasColumnName("method");
            entity.Property(e => e.GeneratedByAi).HasColumnName("generated_by_ai");
            entity.Property(e => e.TestData).HasColumnName("test_data").HasColumnType("jsonb");
            entity.Property(e => e.ExpectedStatus).HasColumnName("expected_status");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
        });

        // EnvironmentConfig
        modelBuilder.Entity<EnvironmentConfig>(entity =>
        {
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.EnvironmentType).HasColumnName("environment_type");
            entity.Property(e => e.DatabaseEngine).HasColumnName("database_engine");
            entity.Property(e => e.DatabaseVersion).HasColumnName("database_version");
            entity.Property(e => e.IsolationLevel).HasColumnName("isolation_level");
            entity.Property(e => e.ContainerImage).HasColumnName("container_image");
            entity.Property(e => e.CpuLimit).HasColumnName("cpu_limit");
            entity.Property(e => e.MemoryLimit).HasColumnName("memory_limit");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
        });

        // TestSession
        modelBuilder.Entity<TestSession>(entity =>
        {
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.EnvironmentConfigId).HasColumnName("environment_config_id");
            entity.Property(e => e.TriggeredBy).HasColumnName("triggered_by");
            entity.Property(e => e.Source).HasColumnName("source");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.TotalTests).HasColumnName("total_tests");
            entity.Property(e => e.PassedTests).HasColumnName("passed_tests");
            entity.Property(e => e.FailedTests).HasColumnName("failed_tests");
            entity.Property(e => e.ErrorTests).HasColumnName("error_tests");
            entity.Property(e => e.StartedAt).HasColumnName("started_at");
            entity.Property(e => e.CompletedAt).HasColumnName("completed_at");
            entity.Property(e => e.Notes).HasColumnName("notes");
        });

        // TestExecution
        modelBuilder.Entity<TestExecution>(entity =>
        {
            entity.Property(e => e.SessionId).HasColumnName("session_id");
            entity.Property(e => e.TestCaseId).HasColumnName("test_case_id");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.ExecutionTimeMs).HasColumnName("execution_time_ms");
            entity.Property(e => e.ResponseStatus).HasColumnName("response_status");
            entity.Property(e => e.ResponseData).HasColumnName("response_data").HasColumnType("jsonb");
            entity.Property(e => e.ErrorMessage).HasColumnName("error_message");
            entity.Property(e => e.ExecutedAt).HasColumnName("executed_at");
        });

        // BugReport
        modelBuilder.Entity<BugReport>(entity =>
        {
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.TestExecutionId).HasColumnName("test_execution_id");
            entity.Property(e => e.Severity).HasColumnName("severity");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.StepsToReproduce).HasColumnName("steps_to_reproduce");
            entity.Property(e => e.AiGeneratedSummary).HasColumnName("ai_generated_summary");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
        });

        // CicdPipeline
        modelBuilder.Entity<CicdPipeline>(entity =>
        {
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Provider).HasColumnName("provider");
            entity.Property(e => e.RepositoryUrl).HasColumnName("repository_url");
            entity.Property(e => e.Branch).HasColumnName("branch");
            entity.Property(e => e.WebhookUrl).HasColumnName("webhook_url");
            entity.Property(e => e.WebhookSecret).HasColumnName("webhook_secret");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.LastRunStatus).HasColumnName("last_run_status");
            entity.Property(e => e.LastRunAt).HasColumnName("last_run_at");
        });
    }

    private void ConfigureRelationships(ModelBuilder modelBuilder)
    {
        // User - UserSetting (1:1)
        modelBuilder.Entity<User>()
            .HasOne(u => u.UserSetting)
            .WithOne(us => us.User)
            .HasForeignKey<UserSetting>(us => us.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User unique email
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // UserSetting unique user_id
        modelBuilder.Entity<UserSetting>()
            .HasIndex(us => us.UserId)
            .IsUnique();

        // ProjectMember composite key
        modelBuilder.Entity<ProjectMember>()
            .HasKey(pm => new { pm.ProjectId, pm.UserId });

        // Project - User (Creator)
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Creator)
            .WithMany(u => u.CreatedProjects)
            .HasForeignKey(p => p.CreatedBy)
            .OnDelete(DeleteBehavior.SetNull);

        // Project - ProjectMembers
        modelBuilder.Entity<Project>()
            .HasMany(p => p.Members)
            .WithOne(pm => pm.Project)
            .HasForeignKey(pm => pm.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasMany(u => u.ProjectMemberships)
            .WithOne(pm => pm.User)
            .HasForeignKey(pm => pm.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // ApiDefinition - Project
        modelBuilder.Entity<ApiDefinition>()
            .HasOne(ad => ad.Project)
            .WithMany(p => p.ApiDefinitions)
            .HasForeignKey(ad => ad.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Unique constraint on api_definitions (project_id, name)
        modelBuilder.Entity<ApiDefinition>()
            .HasIndex(ad => new { ad.ProjectId, ad.Name })
            .IsUnique();

        // ApiEndpoint - ApiDefinition
        modelBuilder.Entity<ApiEndpoint>()
            .HasOne(ae => ae.Api)
            .WithMany(ad => ad.Endpoints)
            .HasForeignKey(ae => ae.ApiId)
            .OnDelete(DeleteBehavior.Cascade);

        // Unique constraint on api_endpoints (api_id, path, method)
        modelBuilder.Entity<ApiEndpoint>()
            .HasIndex(ae => new { ae.ApiId, ae.Path, ae.Method })
            .IsUnique();

        // TestCase relationships
        modelBuilder.Entity<TestCase>()
            .HasOne(tc => tc.Project)
            .WithMany(p => p.TestCases)
            .HasForeignKey(tc => tc.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TestCase>()
            .HasOne(tc => tc.Endpoint)
            .WithMany(ae => ae.TestCases)
            .HasForeignKey(tc => tc.EndpointId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<TestCase>()
            .HasOne(tc => tc.Creator)
            .WithMany(u => u.CreatedTestCases)
            .HasForeignKey(tc => tc.CreatedBy)
            .OnDelete(DeleteBehavior.SetNull);

        // EnvironmentConfig relationships
        modelBuilder.Entity<EnvironmentConfig>()
            .HasOne(ec => ec.Project)
            .WithMany(p => p.EnvironmentConfigs)
            .HasForeignKey(ec => ec.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<EnvironmentConfig>()
            .HasOne(ec => ec.Creator)
            .WithMany(u => u.CreatedEnvironmentConfigs)
            .HasForeignKey(ec => ec.CreatedBy)
            .OnDelete(DeleteBehavior.SetNull);

        // TestSession relationships
        modelBuilder.Entity<TestSession>()
            .HasOne(ts => ts.Project)
            .WithMany(p => p.TestSessions)
            .HasForeignKey(ts => ts.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TestSession>()
            .HasOne(ts => ts.EnvironmentConfig)
            .WithMany(ec => ec.TestSessions)
            .HasForeignKey(ts => ts.EnvironmentConfigId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<TestSession>()
            .HasOne(ts => ts.Trigger)
            .WithMany(u => u.TriggeredSessions)
            .HasForeignKey(ts => ts.TriggeredBy)
            .OnDelete(DeleteBehavior.SetNull);

        // TestExecution relationships
        modelBuilder.Entity<TestExecution>()
            .HasOne(te => te.Session)
            .WithMany(ts => ts.Executions)
            .HasForeignKey(te => te.SessionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TestExecution>()
            .HasOne(te => te.TestCase)
            .WithMany(tc => tc.Executions)
            .HasForeignKey(te => te.TestCaseId)
            .OnDelete(DeleteBehavior.Cascade);

        // BugReport relationships
        modelBuilder.Entity<BugReport>()
            .HasOne(br => br.Project)
            .WithMany(p => p.BugReports)
            .HasForeignKey(br => br.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BugReport>()
            .HasOne(br => br.TestExecution)
            .WithMany(te => te.BugReports)
            .HasForeignKey(br => br.TestExecutionId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<BugReport>()
            .HasOne(br => br.Creator)
            .WithMany(u => u.CreatedBugReports)
            .HasForeignKey(br => br.CreatedBy)
            .OnDelete(DeleteBehavior.SetNull);

        // CicdPipeline relationships
        modelBuilder.Entity<CicdPipeline>()
            .HasOne(cp => cp.Project)
            .WithMany(p => p.CicdPipelines)
            .HasForeignKey(cp => cp.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Add indexes for performance
        modelBuilder.Entity<Project>().HasIndex(p => p.CreatedBy);
        modelBuilder.Entity<Project>().HasIndex(p => p.Status);
        modelBuilder.Entity<TestCase>().HasIndex(tc => tc.ProjectId);
        modelBuilder.Entity<TestCase>().HasIndex(tc => tc.EndpointId);
        modelBuilder.Entity<TestSession>().HasIndex(ts => ts.ProjectId);
        modelBuilder.Entity<TestSession>().HasIndex(ts => ts.Status);
        modelBuilder.Entity<TestExecution>().HasIndex(te => te.SessionId);
        modelBuilder.Entity<TestExecution>().HasIndex(te => te.TestCaseId);
        modelBuilder.Entity<BugReport>().HasIndex(br => br.ProjectId);
        modelBuilder.Entity<BugReport>().HasIndex(br => br.TestExecutionId);
        modelBuilder.Entity<CicdPipeline>().HasIndex(cp => cp.ProjectId);
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.Entity is BaseEntity && 
                       (e.State == EntityState.Added || e.State == EntityState.Modified));

        foreach (var entry in entries)
        {
            var entity = (BaseEntity)entry.Entity;
            entity.UpdatedAt = DateTime.UtcNow;

            if (entry.State == EntityState.Added)
            {
                entity.CreatedAt = DateTime.UtcNow;
            }
        }
    }
}