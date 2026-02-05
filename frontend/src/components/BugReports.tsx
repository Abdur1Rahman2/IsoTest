import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { BugReportBreadcrumb } from "./bug-reports/BugReportBreadcrumb";
import { BugReportList } from "./bug-reports/BugReportList";
import { BugReportDetails } from "./bug-reports/BugReportDetails";
import { BugReportActionBar } from "./bug-reports/BugReportActionBar";
import { useState } from "react";

interface BugReportsProps {
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
}

export function BugReports({ onNavigate, onLogoutClick }: BugReportsProps) {
  const [selectedBugId, setSelectedBugId] = useState<string>("BUG-2347");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="AI Bug Reports" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8 pb-24">
          {/* Breadcrumb */}
          <BugReportBreadcrumb />

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[#0B1F4D] mb-2">AI Bug Report Generation</h1>
            <p className="text-gray-600">
              Generated based on failed test cases using AI-powered debugging.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Bug Report List - Takes 2 columns */}
            <div className="lg:col-span-2">
              <BugReportList 
                selectedBugId={selectedBugId}
                onSelectBug={setSelectedBugId}
              />
            </div>

            {/* Right: Bug Report Details - Takes 1 column */}
            <div>
              <BugReportDetails bugId={selectedBugId} />
            </div>
          </div>
        </main>

        {/* Fixed Bottom Action Bar */}
        <BugReportActionBar />
      </div>
    </div>
  );
}