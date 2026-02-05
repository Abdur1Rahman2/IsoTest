using IsoTestAI.Application.Interfaces;
using IsoTestAI.Domain.Entities;
using IsoTestAI.Domain.Interfaces;

namespace IsoTestAI.Application.Services;

public class TestCaseService : ITestCaseService
{
    private readonly IUnitOfWork _unitOfWork;

    public TestCaseService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<TestCase?> GetTestCaseByIdAsync(Guid id)
    {
        return await _unitOfWork.TestCases.GetByIdAsync(id);
    }

    public async Task<IEnumerable<TestCase>> GetTestCasesByProjectIdAsync(Guid projectId)
    {
        return await _unitOfWork.TestCases.FindAsync(tc => tc.ProjectId == projectId);
    }

    public async Task<IEnumerable<TestCase>> GetTestCasesByEndpointIdAsync(Guid endpointId)
    {
        return await _unitOfWork.TestCases.FindAsync(tc => tc.EndpointId == endpointId);
    }

    public async Task<TestCase> CreateTestCaseAsync(TestCase testCase)
    {
        return await _unitOfWork.TestCases.AddAsync(testCase);
    }

    public async Task<TestCase> UpdateTestCaseAsync(TestCase testCase)
    {
        await _unitOfWork.TestCases.UpdateAsync(testCase);
        return testCase;
    }

    public async Task DeleteTestCaseAsync(Guid id)
    {
        var testCase = await _unitOfWork.TestCases.GetByIdAsync(id);
        if (testCase != null)
        {
            await _unitOfWork.TestCases.DeleteAsync(testCase);
        }
    }
}