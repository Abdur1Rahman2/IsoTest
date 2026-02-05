import { TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const regressionData = [
  { session: "S-2338", failureRate: 5 },
  { session: "S-2339", failureRate: 8 },
  { session: "S-2340", failureRate: 12 },
  { session: "S-2341", failureRate: 15 },
  { session: "S-2342", failureRate: 10 },
  { session: "S-2343", failureRate: 18 },
  { session: "S-2344", failureRate: 8 },
  { session: "S-2345", failureRate: 12 },
  { session: "S-2346", failureRate: 6 },
  { session: "S-2347", failureRate: 10 },
];

export function RegressionAnalysis() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingDown className="w-5 h-5 text-[#00A0B0]" />
        <h3 className="text-[#0B1F4D]">Regression Analysis</h3>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Failure percentage trend over the last 10 test sessions
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={regressionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="session"
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            label={{ value: "Failure Rate (%)", angle: -90, position: "insideLeft", fill: "#6b7280" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#0B1F4D", fontWeight: 500 }}
          />
          <Line
            type="monotone"
            dataKey="failureRate"
            stroke="url(#colorGradient)"
            strokeWidth={3}
            dot={{ fill: "#1B4DFF", r: 5 }}
            activeDot={{ r: 7 }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1B4DFF" />
              <stop offset="100%" stopColor="#00A0B0" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl text-[#1B4DFF]">10%</p>
          <p className="text-sm text-gray-600 mt-1">Current Failure Rate</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl text-green-600">↓ 5%</p>
          <p className="text-sm text-gray-600 mt-1">Improvement vs Peak</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl text-gray-700">12%</p>
          <p className="text-sm text-gray-600 mt-1">Average Failure Rate</p>
        </div>
      </div>
    </div>
  );
}
