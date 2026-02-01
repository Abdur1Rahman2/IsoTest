import { Play, Save } from "lucide-react";

interface EnvActionBarProps {
  onBack: () => void;
  onExecute: () => void;
  isPM?: boolean;
}

export function EnvActionBar({ onBack, onExecute, isPM = false }: EnvActionBarProps) {
  const handleSavePreset = () => {
    console.log("Saving configuration preset...");
  };

  return (
    <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={handleSavePreset}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1B4DFF] transition-colors"
        >
          <Save className="w-4 h-4" />
          Save configuration preset
        </button>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to Test Selection
          </button>
          {!isPM && (
            <button 
              onClick={onExecute}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
            >
              <Play className="w-4 h-4" />
              Execute Tests
            </button>
          )}
        </div>
      </div>
    </div>
  );
}