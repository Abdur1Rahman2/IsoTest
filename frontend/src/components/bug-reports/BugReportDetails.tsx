import { Sparkles, Download, Copy, Play, AlertCircle } from "lucide-react";

interface BugReportDetailsProps {
  bugId: string;
}

const bugDetails: Record<string, any> = {
  "BUG-2347": {
    id: "BUG-2347",
    endpoint: "POST /api/auth/login",
    severity: "critical",
    dateCreated: "2025-11-29 14:32",
    stepsToReproduce: [
      "Send POST request to /api/auth/login",
      "Omit the 'password' field in request body",
      "Include valid email in request",
      "Observe server response",
    ],
    expectedBehavior: "API should return 400 Bad Request with error message: 'Password is required'",
    actualBehavior: "API returns 500 Internal Server Error with message: 'Cannot read property length of undefined'",
    rootCause: "Missing null check before accessing password field. The API attempts to validate password length without first checking if the field exists in the request payload.",
    suggestedFix: `if (!req.body.password) {
  return res.status(400).json({
    error: "Password is required"
  });
}`,
  },
};

export function BugReportDetails({ bugId }: BugReportDetailsProps) {
  const bug = bugDetails[bugId] || bugDetails["BUG-2347"];

  const handleDownloadPDF = () => {
    console.log("Downloading PDF for", bugId);
  };

  const handleCopyJSON = () => {
    const jsonData = JSON.stringify(bug, null, 2);
    navigator.clipboard.writeText(jsonData);
    console.log("Copied to clipboard");
  };

  const handleRerun = () => {
    console.log("Re-running test for", bugId);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 sticky top-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#00A0B0]" />
          <h3 className="text-[#0B1F4D]">Bug Report Details</h3>
        </div>
        <p className="text-sm text-gray-500">AI-generated analysis</p>
      </div>

      <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
        {/* Bug ID and Endpoint */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-800">{bug.id}</h4>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs border border-red-300">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              {bug.severity.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-gray-600">{bug.endpoint}</p>
          <p className="text-xs text-gray-500 mt-1">{bug.dateCreated}</p>
        </div>

        {/* Steps to Reproduce */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-gray-800 mb-3">Steps to Reproduce</h4>
          <ol className="space-y-2">
            {bug.stepsToReproduce.map((step: string, index: number) => (
              <li key={index} className="flex gap-2 text-sm text-gray-700">
                <span className="text-[#1B4DFF]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Expected Behavior */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="text-gray-800 mb-2">Expected Behavior</h4>
          <p className="text-sm text-gray-700">{bug.expectedBehavior}</p>
        </div>

        {/* Actual Behavior */}
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="text-gray-800 mb-2">Actual Behavior</h4>
          <p className="text-sm text-gray-700">{bug.actualBehavior}</p>
        </div>

        {/* Possible Root Cause */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#00A0B0] flex-shrink-0 mt-0.5" />
            <h4 className="text-gray-800">Possible Root Cause (AI)</h4>
          </div>
          <p className="text-sm text-gray-700">{bug.rootCause}</p>
        </div>

        {/* Suggested Fix */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#1B4DFF] flex-shrink-0 mt-0.5" />
            <h4 className="text-gray-800">Suggested Fix / Recommendation</h4>
          </div>
          <pre className="text-sm text-gray-800 bg-white p-3 rounded font-mono overflow-x-auto">
            {bug.suggestedFix}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleDownloadPDF}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handleCopyJSON}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all"
          >
            <Copy className="w-4 h-4" />
            Copy JSON
          </button>
          <button
            onClick={handleRerun}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all"
          >
            <Play className="w-4 h-4" />
            Re-run this Test
          </button>
        </div>
      </div>
    </div>
  );
}
