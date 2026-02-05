import { Code, RefreshCw, ExternalLink } from "lucide-react";

export function APISummaryCard() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 bg-gradient-to-br from-[#1B4DFF]/10 to-[#00A0B0]/10 rounded-lg">
            <Code className="w-6 h-6 text-[#1B4DFF]" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-[#0B1F4D]">API Endpoint</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                POST
              </span>
            </div>
            <p className="text-gray-700 mb-3">/api/auth/login</p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-[#1B4DFF] hover:text-[#00A0B0] transition-colors">
                <ExternalLink className="w-4 h-4" />
                View API Specification
              </button>
              <span className="text-gray-300">|</span>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B4DFF] transition-colors">
                <RefreshCw className="w-4 h-4" />
                Re-upload
              </button>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Schema Analyzed</p>
          <p className="text-sm text-green-600">✓ Valid OpenAPI 3.0</p>
        </div>
      </div>
    </div>
  );
}
