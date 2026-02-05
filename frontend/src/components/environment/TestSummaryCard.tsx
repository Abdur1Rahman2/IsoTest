import { CheckSquare, Edit3 } from "lucide-react";

interface TestSummaryCardProps {
  onBack: () => void;
}

export function TestSummaryCard({ onBack }: TestSummaryCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg">
            <CheckSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-[#0B1F4D] mb-1">Test Selection Summary</h3>
            <p className="text-gray-600">3 test cases selected for execution</p>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all"
        >
          <Edit3 className="w-4 h-4" />
          Change Selection
        </button>
      </div>
    </div>
  );
}
