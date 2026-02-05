import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { MetricCards } from "./dashboard/MetricCards";
import { CreateTestPanel } from "./dashboard/CreateTestPanel";
import { RecentActivity } from "./dashboard/RecentActivity";

interface DashboardProps {
  onNavigateToTestGen: () => void;
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
}

export function Dashboard({ onNavigateToTestGen, onNavigate, onLogoutClick }: DashboardProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="Dashboard" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[#0B1F4D] mb-1">Dashboard</h1>
            <p className="text-gray-600">Welcome to IsoTest AI</p>
          </div>

          {/* Metric Cards */}
          <MetricCards />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CreateTestPanel onNavigateToTestGen={onNavigateToTestGen} />
            <RecentActivity />
          </div>


          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Designed by FYP Team – Bahria University 2025
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}