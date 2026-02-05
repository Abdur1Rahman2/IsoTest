using IsoTestAI.Domain.Entities;

namespace IsoTestAI.Application.Interfaces;

public interface ITestSessionService
{
    Task<TestSession?> GetTestSessionByIdAsync(Guid id);
    Task<IEnumerable<TestSession>> GetTestSessionsByProjectIdAsync(Guid projectId);
    Task<TestSession> CreateTestSessionAsync(TestSession testSession);
    Task<TestSession> UpdateTestSessionAsync(TestSession testSession);
    Task DeleteTestSessionAsync(Guid id);
    Task<TestExecution> AddTestExecutionAsync(TestExecution testExecution);
}