using IsoTestAI.Application.Interfaces;
using IsoTestAI.Domain.Entities;
using IsoTestAI.Domain.Interfaces;

namespace IsoTestAI.Application.Services;

public class BugReportService : IBugReportService
{
    private readonly IUnitOfWork _unitOfWork;

    public BugReportService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<BugReport?> GetBugReportByIdAsync(Guid id)
    {
        return await _unitOfWork.BugReports.GetByIdAsync(id);
    }

    public async Task<IEnumerable<BugReport>> GetBugReportsByProjectIdAsync(Guid projectId)
    {
        return await _unitOfWork.BugReports.FindAsync(br => br.ProjectId == projectId);
    }

    public async Task<IEnumerable<BugReport>> GetBugReportsByTestExecutionIdAsync(Guid testExecutionId)
    {
        return await _unitOfWork.BugReports.FindAsync(br => br.TestExecutionId == testExecutionId);
    }

    public async Task<BugReport> CreateBugReportAsync(BugReport bugReport)
    {
        return await _unitOfWork.BugReports.AddAsync(bugReport);
    }

    public async Task<BugReport> UpdateBugReportAsync(BugReport bugReport)
    {
        await _unitOfWork.BugReports.UpdateAsync(bugReport);
        return bugReport;
    }

    public async Task DeleteBugReportAsync(Guid id)
    {
        var bugReport = await _unitOfWork.BugReports.GetByIdAsync(id);
        if (bugReport != null)
        {
            await _unitOfWork.BugReports.DeleteAsync(bugReport);
        }
    }
}