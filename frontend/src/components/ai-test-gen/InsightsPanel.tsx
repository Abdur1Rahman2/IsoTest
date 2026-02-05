import { Lightbulb, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const insights = [
  {
    type: "warning",
    icon: AlertTriangle,
    message: "Three parameters missing validation in the schema.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    type: "recommendation",
    icon: Lightbulb,
    message: "Recommended to test with empty body and invalid JWT token.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    type: "success",
    icon: CheckCircle,
    message: "All security test cases have been auto-generated.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    type: "info",
    icon: TrendingUp,
    message: "Similar endpoints have 95% pass rate in production.",
    color: "text-[#00A0B0]",
    bgColor: "bg-teal-50",
  },
];

export function InsightsPanel() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-[#00A0B0]" />
        <h3 className="text-[#0B1F4D]">AI Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${insight.bgColor} border border-gray-200`}
            >
              <div className="flex gap-3">
                <Icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {insight.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-[#1B4DFF]/5 to-[#00A0B0]/5 rounded-lg border border-[#1B4DFF]/20">
        <h4 className="text-sm text-gray-700 mb-2">Coverage Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Positive Cases</span>
            <span className="text-gray-800">2 tests</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Negative Cases</span>
            <span className="text-gray-800">3 tests</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Edge Cases</span>
            <span className="text-gray-800">2 tests</span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Coverage</span>
              <span className="text-[#1B4DFF]">87%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
