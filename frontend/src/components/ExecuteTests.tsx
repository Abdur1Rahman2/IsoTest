import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { ExecutionHeader } from "./execute/ExecutionHeader";
import { TestCaseList } from "./execute/TestCaseList";
import { LiveConsole } from "./execute/LiveConsole";
import { AIInterpretation } from "./execute/AIInterpretation";
import { ExecutionActionBar } from "./execute/ExecutionActionBar";
import type { UserData } from "../App";

interface ExecuteTestsProps {
  onBack: () => void;
  onNavigateToBugReport: () => void;
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
  currentUser: UserData | null;
}

export function ExecuteTests({ onBack, onNavigateToBugReport, onNavigate, onLogoutClick, currentUser }: ExecuteTestsProps) {
  const isPM = currentUser?.role === "Project Manager";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="Test Runs" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8 pb-24">
          {/* Header with Progress */}
          <ExecutionHeader />

          {/* PM Restriction Notice */}
          {isPM && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>View-Only Mode:</strong> Test execution controls are restricted to QA Engineers and Developers. You can monitor test progress and view results.
              </p>
            </div>
          )}

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Left: Test Case List */}
            <TestCaseList />

            {/* Right: Live Console */}
            <LiveConsole />
          </div>

          {/* AI Interpretation */}
          <AIInterpretation />
        </main>

        {/* Fixed Bottom Action Bar */}
        <ExecutionActionBar onBack={onBack} onProceedToBugReport={onNavigateToBugReport} isPM={isPM} />
      </div>
    </div>
  );
}