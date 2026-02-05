import { StopCircle, FileText, Download } from "lucide-react";

interface ExecutionActionBarProps {
  onBack: () => void;
  onProceedToBugReport: () => void;
  isPM?: boolean;
}

export function ExecutionActionBar({ onBack, onProceedToBugReport, isPM = false }: ExecutionActionBarProps) {
  const handleStop = () => {
    console.log("Stopping test execution...");
  };

  const handleDownloadLogs = () => {
    console.log("Downloading logs...");
  };

  return (
    <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={handleDownloadLogs}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1B4DFF] transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Logs
        </button>

        <div className="flex items-center gap-3">
          {!isPM && (
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all"
            >
              <StopCircle className="w-4 h-4" />
              Stop Execution
            </button>
          )}
          <button
            onClick={onProceedToBugReport}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
          >
            <FileText className="w-4 h-4" />
            Proceed to Bug Report
          </button>
        </div>
      </div>
    </div>
  );
}