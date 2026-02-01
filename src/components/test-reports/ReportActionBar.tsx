import { Plus, Download, Play } from "lucide-react";

export function ReportActionBar() {
  const handleGenerateNewBatch = () => {
    console.log("Generating new test batch...");
  };

  const handleExportReport = () => {
    console.log("Exporting report...");
  };

  const handleBackToExecution = () => {
    console.log("Going back to live execution...");
  };

  return (
    <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBackToExecution}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1B4DFF] transition-colors"
        >
          <Play className="w-4 h-4" />
          Back to Live Execution
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={handleGenerateNewBatch}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            Generate New Test Batch
          </button>
        </div>
      </div>
    </div>
  );
}
