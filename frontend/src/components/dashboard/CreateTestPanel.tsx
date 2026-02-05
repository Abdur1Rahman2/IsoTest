import { Upload, MessageSquare } from "lucide-react";

interface CreateTestPanelProps {
  onNavigateToTestGen: () => void;
}

export function CreateTestPanel({ onNavigateToTestGen }: CreateTestPanelProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-[#0B1F4D] mb-2">Start Testing</h3>
      <h4 className="text-gray-700 mb-4">Create New API Test</h4>
      
      <div className="space-y-3 mb-4">
        <button 
          onClick={onNavigateToTestGen}
          className="w-full flex items-center gap-3 px-4 py-3 border-2 border-[#1B4DFF] text-[#1B4DFF] rounded-lg hover:bg-[#1B4DFF] hover:text-white transition-all"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Swagger/OpenAPI JSON</span>
        </button>
        
        <button 
          onClick={onNavigateToTestGen}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Use Natural Language Query</span>
        </button>
      </div>
      
      <p className="text-sm text-gray-600">
        Generate test cases automatically using AI or upload your API specification.
      </p>
    </div>
  );
}