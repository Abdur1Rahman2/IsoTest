import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { ReportBreadcrumb } from "./test-reports/ReportBreadcrumb";
import { ReportHeader } from "./test-reports/ReportHeader";
import { ReportKPICards } from "./test-reports/ReportKPICards";
import { TestHistoryTable } from "./test-reports/TestHistoryTable";
import { RegressionAnalysis } from "./test-reports/RegressionAnalysis";
import { ReportActionBar } from "./test-reports/ReportActionBar";
import { DetailedReportPanel } from "./test-reports/DetailedReportPanel";
import { useState } from "react";

interface TestReportsProps {
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
}

export function TestReports({ onNavigate, onLogoutClick }: TestReportsProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

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
          {/* Breadcrumb */}
          <ReportBreadcrumb />

          {/* Header with Search */}
          <ReportHeader />

          {/* KPI Cards */}
          <ReportKPICards />

          {/* Test History Table */}
          <TestHistoryTable 
            onViewReport={setSelectedSessionId}
            selectedSessionId={selectedSessionId}
          />

          {/* Regression Analysis */}
          <RegressionAnalysis />
        </main>

        {/* Fixed Bottom Action Bar */}
        <ReportActionBar />

        {/* Detailed Report Panel (Drawer) */}
        {selectedSessionId && (
          <DetailedReportPanel
            sessionId={selectedSessionId}
            onClose={() => setSelectedSessionId(null)}
          />
        )}
      </div>
    </div>
  );
}