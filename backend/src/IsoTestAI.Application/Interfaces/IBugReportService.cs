using IsoTestAI.Domain.Entities;

namespace IsoTestAI.Application.Interfaces;

public interface IBugReportService
{
    Task<BugReport?> GetBugReportByIdAsync(Guid id);
    Task<IEnumerable<BugReport>> GetBugReportsByProjectIdAsync(Guid projectId);
    Task<IEnumerable<BugReport>> GetBugReportsByTestExecutionIdAsync(Guid testExecutionId);
    Task<BugReport> CreateBugReportAsync(BugReport bugReport);
    Task<BugReport> UpdateBugReportAsync(BugReport bugReport);
    Task DeleteBugReportAsync(Guid id);
}