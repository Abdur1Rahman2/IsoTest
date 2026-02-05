import { ArrowRight } from "lucide-react";

interface ActionBarProps {
  onCancel: () => void;
  onProceed: () => void;
}

export function ActionBar({ onCancel, onProceed }: ActionBarProps) {
  return (
    <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          6 test cases generated • 3 selected for execution
        </p>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onProceed}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
          >
            Proceed to Test Environment Setup
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}