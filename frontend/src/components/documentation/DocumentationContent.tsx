import { useState } from "react";
import { ChevronDown, ChevronRight, Info, Sparkles, Play, FileText, Bug, TrendingUp, Shield, Code } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "Overview of IsoTest AI",
    icon: Info,
    content: `IsoTest AI is an enterprise-grade software testing platform that combines AI-powered test generation with isolated Docker container environments. The platform enables QA Engineers, Developers, and Managers to automatically generate, execute, and analyze API tests with real-time feedback and intelligent bug reporting.

Key Features:
• AI-powered test case generation from Swagger schemas or natural language
• Isolated Docker container environments for safe testing
• Real-time test execution with live console logging
• Automatic bug report generation with AI-powered debugging
• Historical analytics and regression tracking
• Role-based authentication and access control`,
  },
  {
    id: 2,
    title: "Screen-by-Screen Workflow",
    icon: Sparkles,
    content: `Complete user journey through IsoTest AI:

1. Login Screen
   • Enter your email and password
   • Secure authentication with validation
   • "Remember Me" option for convenience

2. Two-Factor Authentication (2FA)
   • Enter 6-digit verification code
   • Code sent to your registered email
   • Resend option if code expires

3. Dashboard
   • View key metrics: Total Tests, Pass Rate, Active Projects
   • Quick access to recent activities
   • Upcoming test schedule overview

4. API Test Creation
   • Upload Swagger/OpenAPI schema or enter endpoint manually
   • AI analyzes your API structure
   • Generate test cases automatically

5. AI Test Generation
   • Review AI-generated test cases
   • Confidence scores for each test
   • Edit or approve tests before execution

6. Environment Setup
   • Configure Docker container settings
   • Select base image and environment variables
   • Set resource limits and network configuration

7. Test Execution
   • Real-time test execution with live logs
   • Watch console output as tests run
   • AI interpretation of results

8. Bug Reports
   • Auto-generated bug reports for failed tests
   • Steps to reproduce, root cause analysis
   • Suggested fixes from AI
   • Export to PDF or JSON

9. Analytics & Historical Dashboard
   • View test history and trends
   • Regression analysis over time
   • Performance metrics and insights`,
  },
  {
    id: 3,
    title: "Button & Icon Guide",
    icon: Play,
    content: `Understanding the interface elements:

Primary Actions (Blue Gradient):
• "Generate Tests" - Start AI test generation
• "Execute Tests" - Run test suite
• "Download Report" - Export results

Secondary Actions (White/Gray):
• "Cancel" - Abort current action
• "Edit" - Modify settings or tests
• "View Details" - Expand information

Icon Meanings:
⚡ Sparkles - AI-powered feature
🐛 Bug - Bug report or issue
📊 Trending - Analytics and trends
▶️ Play - Execute or run
📄 File - Document or report
⚙️ Settings - Configuration
🔒 Shield - Security feature
✓ Check - Success or approved
✗ X - Failed or error`,
  },
  {
    id: 4,
    title: "Technical Requirements",
    icon: Code,
    content: `System Requirements:

Minimum:
• Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
• 4GB RAM available
• Stable internet connection (5 Mbps minimum)
• Docker installed (for local testing)

Recommended:
• 8GB RAM or more
• 10 Mbps internet connection
• Docker with at least 4GB allocated memory
• Multi-core processor

API Requirements:
• OpenAPI/Swagger 2.0 or 3.0 specification
• RESTful API endpoints
• JSON response format
• Valid authentication credentials (if required)

Supported Testing:
• GET, POST, PUT, DELETE, PATCH requests
• OAuth 2.0, API Key, Basic Auth
• JSON and XML payloads
• File uploads and multipart requests`,
  },
  {
    id: 5,
    title: "Frequently Asked Questions (FAQs)",
    icon: FileText,
    content: `Common Questions:

Q: How does AI test generation work?
A: Our AI analyzes your API schema or natural language description, identifies common test scenarios, edge cases, and potential vulnerabilities, then generates comprehensive test cases with confidence scores.

Q: Are my tests isolated?
A: Yes! Each test session runs in its own Docker container, ensuring complete isolation from production environments and other tests.

Q: Can I customize generated tests?
A: Absolutely. All AI-generated tests can be reviewed, edited, or deleted before execution. You have full control.

Q: How accurate are the bug reports?
A: Our AI-powered analysis provides root cause identification with high accuracy. However, we recommend developer review for critical issues.

Q: What happens to my test data?
A: All test data is encrypted and stored securely. Historical data is retained for analytics but can be deleted upon request.

Q: Can I integrate with CI/CD?
A: Yes! IsoTest AI supports integration with popular CI/CD tools like Jenkins, GitHub Actions, GitLab CI, and CircleCI.

Q: How long does test execution take?
A: Execution time varies based on API complexity and number of tests. Average sessions complete in 30-60 seconds.

Q: Can I export test results?
A: Yes. Reports can be exported as PDF, JSON, or CSV formats from the Analytics dashboard.`,
  },
];

export function DocumentationContent() {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);

  const toggleSection = (id: number) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const Icon = section.icon;
        const isExpanded = expandedSections.includes(section.id);

        return (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#1B4DFF] to-[#00A0B0] rounded-lg">
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-[#0B1F4D]">{section.title}</h3>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Content */}
            {isExpanded && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="pt-6">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {section.content}
                  </pre>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
