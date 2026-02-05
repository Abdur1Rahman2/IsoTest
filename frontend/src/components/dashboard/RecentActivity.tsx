import { CheckCircle, XCircle, Loader, ExternalLink } from "lucide-react";

const activities = [
  {
    endpoint: "POST /api/auth/login",
    status: "passed",
    timestamp: "2 minutes ago",
  },
  {
    endpoint: "GET /api/users/{id}",
    status: "running",
    timestamp: "5 minutes ago",
  },
  {
    endpoint: "PUT /api/products/update",
    status: "failed",
    timestamp: "12 minutes ago",
  },
  {
    endpoint: "DELETE /api/orders/{id}",
    status: "passed",
    timestamp: "23 minutes ago",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#0B1F4D]">Recent Activity</h3>
        <a href="#" className="text-sm text-[#1B4DFF] hover:text-[#00A0B0] transition-colors">
          View All
        </a>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#1B4DFF]/30 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              {activity.status === "passed" && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {activity.status === "failed" && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              {activity.status === "running" && (
                <Loader className="w-5 h-5 text-blue-500 animate-spin" />
              )}
              
              <div>
                <p className="text-sm text-gray-800">{activity.endpoint}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>

            <button className="text-gray-400 hover:text-[#1B4DFF] transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
