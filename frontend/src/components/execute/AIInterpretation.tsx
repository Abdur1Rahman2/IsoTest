import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, AlertTriangle, Lightbulb } from "lucide-react";

export function AIInterpretation() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-all"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00A0B0]" />
          <h3 className="text-[#0B1F4D]">AI Interpretation</h3>
          <span className="text-sm text-gray-500">Analyzing test results...</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Failed Test Analysis */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="text-gray-800">Failed Test: Missing password field</h4>
              </div>

              <div className="space-y-3">
                {/* Expected vs Actual */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-gray-700 mb-2">Expected Behavior:</p>
                  <code className="text-sm text-gray-800 block bg-white p-2 rounded">
                    Status Code: 400 Bad Request
                  </code>
                  <code className="text-sm text-gray-800 block bg-white p-2 rounded mt-1">
                    Error: "Password is required"
                  </code>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-gray-700 mb-2">Actual Behavior:</p>
                  <code className="text-sm text-red-700 block bg-white p-2 rounded">
                    Status Code: 500 Internal Server Error
                  </code>
                  <code className="text-sm text-red-700 block bg-white p-2 rounded mt-1">
                    Error: "Cannot read property 'length' of undefined"
                  </code>
                </div>

                {/* Root Cause */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="text-gray-800">Probable Cause:</span> Missing null
                        check before accessing password field. The API is attempting to validate
                        password length without first checking if the field exists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="space-y-4">
              <h4 className="text-gray-800 mb-4">AI Recommendations</h4>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-[#1B4DFF] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-800 mb-1">Code Fix Suggestion:</p>
                    <code className="text-sm text-gray-700 block bg-white p-3 rounded font-mono mt-2">
                      {`if (!req.body.password) {\n  return res.status(400).json({\n    error: "Password is required"\n  });\n}`}
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700">
                  <span className="text-gray-800">Related Tests:</span> Consider adding
                  additional validation tests for other required fields (email, username) to
                  ensure consistent error handling.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-700">
                  <span className="text-gray-800">Security Note:</span> Error messages should
                  not expose internal implementation details. Consider using generic error
                  messages for production.
                </p>
              </div>

            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
