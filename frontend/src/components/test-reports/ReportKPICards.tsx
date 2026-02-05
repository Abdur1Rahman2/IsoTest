import { Calendar, TrendingUp, AlertTriangle, Clock } from "lucide-react";

const kpis = [
  {
    title: "Total Test Sessions",
    value: "147",
    change: "+12 this week",
    trend: "up",
    icon: Calendar,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Passed vs Failed Ratio",
    value: "87%",
    change: "Pass rate",
    trend: "up",
    icon: TrendingUp,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Regressions Detected",
    value: "8",
    change: "Last 30 days",
    trend: "down",
    icon: AlertTriangle,
    color: "from-red-500 to-red-600",
  },
  {
    title: "Avg Execution Time",
    value: "42s",
    change: "-8s faster",
    trend: "up",
    icon: Clock,
    color: "from-[#00A0B0] to-teal-600",
  },
];

export function ReportKPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.title}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                <Icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  kpi.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {kpi.change}
              </span>
            </div>
            <h3 className="text-3xl text-[#0B1F4D] mb-1">{kpi.value}</h3>
            <p className="text-sm text-gray-600">{kpi.title}</p>
          </div>
        );
      })}
    </div>
  );
}
