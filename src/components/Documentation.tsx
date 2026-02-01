import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { DocumentationBreadcrumb } from "./documentation/DocumentationBreadcrumb";
import { DocumentationContent } from "./documentation/DocumentationContent";
import { ArrowLeft } from "lucide-react";

interface DocumentationProps {
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
  onBackToDashboard: () => void;
}

export function Documentation({ onNavigate, onLogoutClick, onBackToDashboard }: DocumentationProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="Documentation" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8">
          {/* Breadcrumb */}
          <DocumentationBreadcrumb />

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[#0B1F4D] mb-2">IsoTest AI – User Guide</h1>
            <p className="text-gray-600">
              Learn how to use the platform step-by-step.
            </p>
          </div>

          {/* Documentation Content */}
          <DocumentationContent />

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
