import { Sparkles, AlertCircle, TrendingUp, Shield } from "lucide-react";

const recommendations = [
  {
    icon: Sparkles,
    text: "Based on selected test cases, we recommend using a fresh Docker container per run.",
    color: "text-[#00A0B0]",
  },
  {
    icon: AlertCircle,
    text: "Parallel execution may reduce performance due to concurrent database writes.",
    color: "text-yellow-600",
  },
  {
    icon: TrendingUp,
    text: "Average execution time for similar test suites: 45 seconds.",
    color: "text-blue-600",
  },
  {
    icon: Shield,
    text: "Isolation mode ensures no data pollution between test runs.",
    color: "text-green-600",
  },
];

export function AIRecommendation() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#00A0B0]" />
        <h3 className="text-[#0B1F4D]">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div
              key={index}
              className="flex gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <Icon className={`w-5 h-5 ${rec.color} flex-shrink-0 mt-0.5`} />
              <p className="text-sm text-gray-700 leading-relaxed">{rec.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-[#1B4DFF]/5 to-[#00A0B0]/5 rounded-lg border border-[#1B4DFF]/20">
        <h4 className="text-sm text-gray-700 mb-3">Configuration Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Environment:</span>
            <span className="text-gray-800">Docker Container</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Database:</span>
            <span className="text-gray-800">postgres:latest</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Reset Policy:</span>
            <span className="text-gray-800">Per Test</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Isolation:</span>
            <span className="text-green-600">✓ Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
