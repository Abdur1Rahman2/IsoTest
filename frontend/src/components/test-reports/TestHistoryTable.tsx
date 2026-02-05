import { useState, useEffect } from "react";
import { ExternalLink, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface TestSession {
  id: string;
  dateTime: string;
  endpoint: string;
  totalTests: number;
  passed: number;
  failed: number;
  result: "passed" | "failed" | "mixed";
  isRecent?: boolean;
}

const testSessions: TestSession[] = [
  {
    id: "SESSION-2347",
    dateTime: "2025-11-29 14:32",
    endpoint: "POST /api/auth/login",
    totalTests: 6,
    passed: 5,
    failed: 1,
    result: "mixed",
    isRecent: true,
  },
  {
    id: "SESSION-2346",
    dateTime: "2025-11-28 11:15",
    endpoint: "GET /api/users/{id}",
    totalTests: 8,
    passed: 8,
    failed: 0,
    result: "passed",
  },
  {
    id: "SESSION-2345",
    dateTime: "2025-11-27 09:42",
    endpoint: "PUT /api/products/update",
    totalTests: 5,
    passed: 3,
    failed: 2,
    result: "mixed",
  },
  {
    id: "SESSION-2344",
    dateTime: "2025-11-26 16:20",
    endpoint: "POST /api/orders/create",
    totalTests: 10,
    passed: 10,
    failed: 0,
    result: "passed",
  },
  {
    id: "SESSION-2343",
    dateTime: "2025-11-25 13:05",
    endpoint: "DELETE /api/orders/{id}",
    totalTests: 4,
    passed: 1,
    failed: 3,
    result: "failed",
  },
];

interface TestHistoryTableProps {
  onViewReport: (sessionId: string) => void;
  selectedSessionId: string | null;
}

export function TestHistoryTable({ onViewReport, selectedSessionId }: TestHistoryTableProps) {
  const [highlightedSession, setHighlightedSession] = useState<string | null>("SESSION-2347");

  useEffect(() => {
    // Remove highlight after 3 seconds
    const timer = setTimeout(() => {
      setHighlightedSession(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getResultIcon = (result: string) => {
    switch (result) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "mixed":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case "passed":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "mixed":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-6">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-[#0B1F4D]">Test History</h3>
        <p className="text-sm text-gray-600 mt-1">Recent test execution sessions</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Session ID</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Date & Time</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">API Tested</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Total Tests</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Execution Result</th>
              <th className="px-6 py-3 text-center text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {testSessions.map((session) => (
              <tr
                key={session.id}
                className={`hover:bg-gray-50 transition-all ${
                  selectedSessionId === session.id ? "bg-blue-50" : ""
                } ${
                  highlightedSession === session.id
                    ? "bg-[#00A0B0]/10 animate-pulse"
                    : ""
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800">{session.id}</span>
                    {session.isRecent && (
                      <span className="px-2 py-0.5 bg-[#00A0B0] text-white text-xs rounded">
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{session.dateTime}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-800">{session.endpoint}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-800">{session.totalTests}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">{session.passed} ✓</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-red-600">{session.failed} ✗</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getResultIcon(session.result)}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getResultBadge(
                        session.result
                      )}`}
                    >
                      {session.result.charAt(0).toUpperCase() + session.result.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => onViewReport(session.id)}
                      className="flex items-center gap-2 px-4 py-2 text-[#1B4DFF] hover:bg-[#1B4DFF]/10 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Report
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
