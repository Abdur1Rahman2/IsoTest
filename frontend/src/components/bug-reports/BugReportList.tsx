import { useState, useEffect } from "react";
import { ExternalLink, AlertCircle } from "lucide-react";

interface BugReport {
  id: string;
  title: string;
  endpoint: string;
  status: "open" | "resolved";
  severity: "critical" | "major" | "minor";
  dateCreated: string;
  isNew?: boolean;
}

const bugReports: BugReport[] = [
  {
    id: "BUG-2347",
    title: "Missing password field validation",
    endpoint: "POST /api/auth/login",
    status: "open",
    severity: "critical",
    dateCreated: "2025-11-29 14:32",
    isNew: true,
  },
  {
    id: "BUG-2346",
    title: "SQL injection vulnerability",
    endpoint: "GET /api/users/{id}",
    status: "resolved",
    severity: "critical",
    dateCreated: "2025-11-28 11:15",
  },
  {
    id: "BUG-2345",
    title: "Incorrect error status code",
    endpoint: "PUT /api/products/update",
    status: "open",
    severity: "major",
    dateCreated: "2025-11-27 09:42",
  },
  {
    id: "BUG-2344",
    title: "Response timeout handling",
    endpoint: "POST /api/orders/create",
    status: "resolved",
    severity: "major",
    dateCreated: "2025-11-26 16:20",
  },
  {
    id: "BUG-2343",
    title: "Missing CORS headers",
    endpoint: "GET /api/config",
    status: "resolved",
    severity: "minor",
    dateCreated: "2025-11-25 13:05",
  },
];

interface BugReportListProps {
  selectedBugId: string;
  onSelectBug: (bugId: string) => void;
}

export function BugReportList({ selectedBugId, onSelectBug }: BugReportListProps) {
  const [highlightedBug, setHighlightedBug] = useState<string | null>("BUG-2347");

  useEffect(() => {
    // Remove highlight after 3 seconds
    const timer = setTimeout(() => {
      setHighlightedBug(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      case "major":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "minor":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "open"
      ? "bg-blue-100 text-blue-700"
      : "bg-green-100 text-green-700";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-[#0B1F4D]">Bug Reports</h3>
          <span className="text-sm text-gray-500">
            {bugReports.filter(b => b.status === "open").length} open issues
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Bug ID</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Severity</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Date Created</th>
              <th className="px-6 py-3 text-center text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bugReports.map((bug) => (
              <tr
                key={bug.id}
                className={`hover:bg-gray-50 transition-all cursor-pointer ${
                  selectedBugId === bug.id ? "bg-blue-50" : ""
                } ${
                  highlightedBug === bug.id
                    ? "bg-blue-100 animate-pulse"
                    : ""
                }`}
                onClick={() => onSelectBug(bug.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800">{bug.id}</span>
                    {bug.isNew && (
                      <span className="px-2 py-0.5 bg-[#00A0B0] text-white text-xs rounded">
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-gray-800">{bug.title}</p>
                    <p className="text-sm text-gray-500">{bug.endpoint}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border ${getSeverityColor(
                      bug.severity
                    )}`}
                  >
                    {bug.severity === "critical" && (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {bug.severity.charAt(0).toUpperCase() + bug.severity.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(
                      bug.status
                    )}`}
                  >
                    {bug.status.charAt(0).toUpperCase() + bug.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{bug.dateCreated}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4 text-gray-600" />
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
