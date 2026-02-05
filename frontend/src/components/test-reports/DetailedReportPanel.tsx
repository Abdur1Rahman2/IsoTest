import { X, Play, FileText, Bug } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface DetailedReportPanelProps {
  sessionId: string;
  onClose: () => void;
}

const sessionData: Record<string, any> = {
  "SESSION-2347": {
    id: "SESSION-2347",
    endpoint: "POST /api/auth/login",
    dateTime: "2025-11-29 14:32",
    duration: "42s",
    totalTests: 6,
    passed: 5,
    failed: 1,
    failedTests: [
      { name: "Missing password field", reason: "Expected 400, got 500" },
    ],
  },
};

const COLORS = {
  passed: "#4CAF50",
  failed: "#E53935",
};

export function DetailedReportPanel({ sessionId, onClose }: DetailedReportPanelProps) {
  const session = sessionData[sessionId] || sessionData["SESSION-2347"];

  const pieData = [
    { name: "Passed", value: session.passed },
    { name: "Failed", value: session.failed },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[500px] bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-[#0B1F4D]">Detailed Report</h3>
            <p className="text-sm text-gray-600 mt-1">{session.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Endpoint Tested */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-gray-800 mb-2">Endpoint Tested</h4>
            <p className="text-gray-700">{session.endpoint}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>Executed: {session.dateTime}</span>
              <span>•</span>
              <span>Duration: {session.duration}</span>
            </div>
          </div>

          {/* Pass/Fail Distribution */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-gray-800 mb-4">Pass/Fail Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === "Passed" ? COLORS.passed : COLORS.failed}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-2xl text-green-600">{session.passed}</p>
                <p className="text-sm text-gray-600">Passed</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-2xl text-red-600">{session.failed}</p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
            </div>
          </div>

          {/* Failure Breakdown */}
          {session.failed > 0 && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="text-gray-800 mb-3">Failure Breakdown</h4>
              <div className="space-y-2">
                {session.failedTests.map((test: any, index: number) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-red-200">
                    <p className="text-sm text-gray-800">{test.name}</p>
                    <p className="text-xs text-red-600 mt-1">{test.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Execution Timeline */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-gray-800 mb-3">Execution Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Environment initialized</p>
                  <p className="text-xs text-gray-500">00:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Tests executed</p>
                  <p className="text-xs text-gray-500">00:05 - 00:38</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Results compiled</p>
                  <p className="text-xs text-gray-500">00:42</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all">
              <Play className="w-4 h-4" />
              Re-run this Test
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all">
              <FileText className="w-4 h-4" />
              Generate New Tests
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all">
              <Bug className="w-4 h-4" />
              View AI Bug Report
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
