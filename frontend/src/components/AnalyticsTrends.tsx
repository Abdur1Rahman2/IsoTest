import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus, ExternalLink } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalyticsTrendsProps {
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
}

export function AnalyticsTrends({ onNavigate, onLogoutClick }: AnalyticsTrendsProps) {
  // KPI Data
  const kpiData = [
    {
      title: "Pass Rate",
      value: "87.4%",
      change: "+2.3%",
      trend: "up",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Failure Rate",
      value: "12.6%",
      change: "-2.3%",
      trend: "down",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "Avg Execution Time",
      value: "4.2 min",
      change: "-0.5 min",
      trend: "down",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Regression Cases",
      value: "8",
      change: "0",
      trend: "neutral",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
  ];

  // Trend Chart Data
  const trendData = [
    { session: "Nov 20", passed: 45, failed: 8 },
    { session: "Nov 22", passed: 48, failed: 7 },
    { session: "Nov 24", passed: 50, failed: 5 },
    { session: "Nov 26", passed: 47, failed: 9 },
    { session: "Nov 28", passed: 52, failed: 6 },
    { session: "Nov 30", passed: 54, failed: 8 },
  ];

  // API Coverage Data
  const coverageData = [
    { endpoint: "/api/users", tests: 45, coverage: 92 },
    { endpoint: "/api/products", tests: 38, coverage: 85 },
    { endpoint: "/api/orders", tests: 52, coverage: 95 },
    { endpoint: "/api/payments", tests: 28, coverage: 78 },
    { endpoint: "/api/auth", tests: 35, coverage: 88 },
  ];

  // Pie Chart Data
  const pieData = [
    { name: "Passed", value: 87.4, color: "#10B981" },
    { name: "Failed", value: 12.6, color: "#EF4444" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="w-4 h-4" />;
      case "down":
        return <ArrowDownRight className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="Analytics & Trends" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-[#1B4DFF]" />
              <h1 className="text-[#0B1F4D]">Analytics & Trends</h1>
            </div>
            <p className="text-gray-600">
              Review test performance metrics and regression analysis over time.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpiData.map((kpi, index) => (
              <Card key={index} className={`p-5 border-2 ${kpi.borderColor} ${kpi.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <div className={`${kpi.color}`}>
                    {getTrendIcon(kpi.trend)}
                  </div>
                </div>
                <p className={`text-2xl ${kpi.color} mb-1`}>{kpi.value}</p>
                <p className="text-xs text-gray-500">
                  {kpi.change} from last week
                </p>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Trend Chart */}
            <Card className="p-6">
              <h2 className="text-[#0B1F4D] mb-4">Pass/Fail Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="session" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="passed" stroke="#10B981" strokeWidth={2} name="Passed" />
                  <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} name="Failed" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Test Distribution Pie Chart */}
            <Card className="p-6">
              <h2 className="text-[#0B1F4D] mb-4">Test Result Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* API Coverage Analysis */}
          <Card className="p-6 mb-6">
            <h2 className="text-[#0B1F4D] mb-4">API Coverage Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coverageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="endpoint" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="tests" fill="#1B4DFF" name="Total Tests" />
                <Bar dataKey="coverage" fill="#00A0B0" name="Coverage %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Coverage Table */}
          <Card className="p-6 mb-6">
            <h2 className="text-[#0B1F4D] mb-4">Endpoint Coverage Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">API Endpoint</th>
                    <th className="text-left py-3 px-4 text-gray-600">Total Tests</th>
                    <th className="text-left py-3 px-4 text-gray-600">Coverage %</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {coverageData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-[#0B1F4D]">{item.endpoint}</td>
                      <td className="py-3 px-4 text-gray-600">{item.tests}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] h-2 rounded-full"
                              style={{ width: `${item.coverage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{item.coverage}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.coverage >= 90 ? 'bg-green-100 text-green-700' : 
                          item.coverage >= 80 ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.coverage >= 90 ? 'Excellent' : item.coverage >= 80 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bottom Action */}
          <div className="flex justify-end">
            <Button 
              onClick={() => onNavigate && onNavigate("Test Runs")}
              className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white hover:shadow-lg flex items-center gap-2"
            >
              View Full Test History
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
