import { FileCode, Sparkles, Play, Bug } from "lucide-react";

const metrics = [
  {
    title: "Total APIs Tested",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: FileCode,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "AI-Generated Test Cases",
    value: "1,842",
    change: "+28%",
    trend: "up",
    icon: Sparkles,
    color: "from-[#00A0B0] to-teal-600",
  },
  {
    title: "Test Cases Passed",
    value: "60%",
    change: "Passed",
    trend: "neutral",
    icon: Play,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Detected Bugs",
    value: "34",
    change: "5 Critical",
    trend: "down",
    icon: Bug,
    color: "from-red-500 to-red-600",
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.title}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color}`}>
                <Icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  metric.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : metric.trend === "down"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <h3 className="text-3xl text-[#0B1F4D] mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        );
      })}
    </div>
  );
}
