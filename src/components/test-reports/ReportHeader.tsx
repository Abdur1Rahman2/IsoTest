import { Search } from "lucide-react";

export function ReportHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-[#0B1F4D] mb-2">Test Report & Historical Dashboard</h1>
          <p className="text-gray-600">
            Analyze test history, track regressions, and optimize API quality over time.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by API endpoint, date, or session ID..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
