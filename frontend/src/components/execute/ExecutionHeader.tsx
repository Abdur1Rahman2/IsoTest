import { useState, useEffect } from "react";
import { Play, Clock, Loader2 } from "lucide-react";

export function ExecutionHeader() {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 800);

    // Timer
    const timerInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-[#1B4DFF]/10 to-[#00A0B0]/10 rounded-lg">
          <Loader2 className="w-6 h-6 text-[#1B4DFF] animate-spin" />
        </div>
        <div>
          <h1 className="text-[#0B1F4D]">Execute Tests</h1>
          <p className="text-gray-600">Tests are running in isolated environment.</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-[#1B4DFF]" />
              <span className="text-gray-700">Execution Progress</span>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] h-3 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl text-green-600">2</p>
            <p className="text-sm text-gray-600">Passed</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl text-red-600">1</p>
            <p className="text-sm text-gray-600">Failed</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl text-blue-600">3</p>
            <p className="text-sm text-gray-600">Running</p>
          </div>
        </div>
      </div>
    </div>
  );
}
