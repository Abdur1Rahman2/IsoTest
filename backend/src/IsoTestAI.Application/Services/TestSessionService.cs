using IsoTestAI.Application.Interfaces;
using IsoTestAI.Domain.Entities;
using IsoTestAI.Domain.Interfaces;

namespace IsoTestAI.Application.Services;

public class TestSessionService : ITestSessionService
{
    private readonly IUnitOfWork _unitOfWork;

    public TestSessionService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<TestSession?> GetTestSessionByIdAsync(Guid id)
    {
        return await _unitOfWork.TestSessions.GetByIdAsync(id);
    }

    public async Task<IEnumerable<TestSession>> GetTestSessionsByProjectIdAsync(Guid projectId)
    {
        return await _unitOfWork.TestSessions.FindAsync(ts => ts.ProjectId == projectId);
    }

    public async Task<TestSession> CreateTestSessionAsync(TestSession testSession)
    {
        return await _unitOfWork.TestSessions.AddAsync(testSession);
    }

    public async Task<TestSession> UpdateTestSessionAsync(TestSession testSession)
    {
        await _unitOfWork.TestSessions.UpdateAsync(testSession);
        return testSession;
    }

    public async Task DeleteTestSessionAsync(Guid id)
    {
        var testSession = await _unitOfWork.TestSessions.GetByIdAsync(id);
        if (testSession != null)
        {
            await _unitOfWork.TestSessions.DeleteAsync(testSession);
        }
    }

    public async Task<TestExecution> AddTestExecutionAsync(TestExecution testExecution)
    {
        return await _unitOfWork.TestExecutions.AddAsync(testExecution);
    }
}