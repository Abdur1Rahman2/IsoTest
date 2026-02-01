import { useState } from "react";
import { CheckCircle, XCircle, Loader2, ChevronDown, ChevronRight } from "lucide-react";

interface TestCase {
  id: number;
  name: string;
  status: "passed" | "failed" | "running" | "pending";
  duration?: string;
  details?: string;
}

const testCases: TestCase[] = [
  {
    id: 1,
    name: "Valid login credentials",
    status: "passed",
    duration: "1.2s",
    details: "✓ Expected: 200 OK\n✓ Token received\n✓ User data validated",
  },
  {
    id: 2,
    name: "Invalid email format",
    status: "passed",
    duration: "0.8s",
    details: "✓ Expected: 400 Bad Request\n✓ Error message correct",
  },
  {
    id: 3,
    name: "Missing password field",
    status: "failed",
    duration: "1.5s",
    details: "✗ Expected: 400 Bad Request\n✗ Received: 500 Internal Server Error\n✗ Error handling missing",
  },
  {
    id: 4,
    name: "SQL injection attempt",
    status: "running",
    details: "Testing security validation...",
  },
  {
    id: 5,
    name: "Empty request body",
    status: "running",
  },
  {
    id: 6,
    name: "Maximum length password",
    status: "pending",
  },
];

export function TestCaseList() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "running":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-[#0B1F4D]">Test Cases</h3>
        <p className="text-sm text-gray-600 mt-1">Real-time execution status</p>
      </div>

      <div className="divide-y divide-gray-200">
        {testCases.map((testCase) => (
          <div key={testCase.id}>
            <div
              className={`p-4 hover:bg-gray-50 transition-all cursor-pointer ${
                expandedId === testCase.id ? "bg-gray-50" : ""
              }`}
              onClick={() => setExpandedId(expandedId === testCase.id ? null : testCase.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(testCase.status)}
                  <div className="flex-1">
                    <p className="text-gray-800">{testCase.name}</p>
                    {testCase.duration && (
                      <p className="text-sm text-gray-500 mt-0.5">{testCase.duration}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(
                      testCase.status
                    )}`}
                  >
                    {testCase.status.charAt(0).toUpperCase() + testCase.status.slice(1)}
                  </span>
                  {testCase.details && (
                    <>
                      {expandedId === testCase.id ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {expandedId === testCase.id && testCase.details && (
              <div className="px-4 pb-4 bg-gray-50">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    {testCase.details}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
