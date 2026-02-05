import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { EnvBreadcrumb } from "./environment/EnvBreadcrumb";
import { TestSummaryCard } from "./environment/TestSummaryCard";
import { EnvironmentConfig } from "./environment/EnvironmentConfig";
import { AdvancedSetup } from "./environment/AdvancedSetup";
import { AIRecommendation } from "./environment/AIRecommendation";
import { EnvActionBar } from "./environment/EnvActionBar";
import type { UserData } from "../App";

interface EnvironmentSetupProps {
  onBack: () => void;
  onExecute: () => void;
  currentUser: UserData | null;
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
}

export function EnvironmentSetup({ onBack, onExecute, currentUser, onNavigate, onLogoutClick }: EnvironmentSetupProps) {
  const isPM = currentUser?.role === "Project Manager";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeScreen="Test Runs"
        onNavigate={onNavigate}
        onLogoutClick={onLogoutClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8 pb-24">
          {/* Breadcrumb */}
          <EnvBreadcrumb />

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[#0B1F4D] mb-2">Isolated Test Environment Setup</h1>
            <p className="text-gray-600">
              Select environment preferences to ensure tests run on a clean and independent database container.
            </p>
          </div>

          {/* PM Restriction Notice */}
          {isPM && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Test execution is restricted to QA Engineers and Developers. Project Managers have view-only access for monitoring and escalation.
              </p>
            </div>
          )}

          {/* Test Summary */}
          <TestSummaryCard onBack={onBack} />

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left: Configuration - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <EnvironmentConfig />
              <AdvancedSetup />
            </div>

            {/* Right: AI Recommendation - Takes 1 column */}
            <div>
              <AIRecommendation />
            </div>
          </div>
        </main>

        {/* Fixed Bottom Action Bar */}
        <EnvActionBar onBack={onBack} onExecute={onExecute} isPM={isPM} />
      </div>
    </div>
  );
}