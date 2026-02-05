import { CheckCircle, FileText } from "lucide-react";

export function BugReportActionBar() {
  const handleMarkResolved = () => {
    console.log("Marking bug as resolved...");
  };

  const handleReportAnother = () => {
    console.log("Reporting another issue...");
  };

  const handleBackToExecution = () => {
    console.log("Going back to test execution...");
  };

  return (
    <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={handleReportAnother}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1B4DFF] transition-colors"
        >
          <FileText className="w-4 h-4" />
          Report another issue
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToExecution}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to Test Execution
          </button>
          <button
            onClick={handleMarkResolved}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
