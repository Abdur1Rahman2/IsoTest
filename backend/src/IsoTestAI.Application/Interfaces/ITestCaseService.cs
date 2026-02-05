using IsoTestAI.Domain.Entities;

namespace IsoTestAI.Application.Interfaces;

public interface ITestCaseService
{
    Task<TestCase?> GetTestCaseByIdAsync(Guid id);
    Task<IEnumerable<TestCase>> GetTestCasesByProjectIdAsync(Guid projectId);
    Task<IEnumerable<TestCase>> GetTestCasesByEndpointIdAsync(Guid endpointId);
    Task<TestCase> CreateTestCaseAsync(TestCase testCase);
    Task<TestCase> UpdateTestCaseAsync(TestCase testCase);
    Task DeleteTestCaseAsync(Guid id);
}