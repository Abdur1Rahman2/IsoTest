using Microsoft.EntityFrameworkCore;
using IsoTestAI.Domain.Entities;

namespace IsoTestAI.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // DbSets will be added here as we create entities
    // public DbSet<User> Users { get; set; }
    // public DbSet<ApiProject> ApiProjects { get; set; }
    // public DbSet<TestCase> TestCases { get; set; }
    // public DbSet<TestExecution> TestExecutions { get; set; }
    // public DbSet<BugReport> BugReports { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Entity configurations will be added here
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
