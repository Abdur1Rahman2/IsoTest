import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { Breadcrumb } from "./ai-test-gen/Breadcrumb";
import { APISummaryCard } from "./ai-test-gen/APISummaryCard";
import { TestCasesTable } from "./ai-test-gen/TestCasesTable";
import { InsightsPanel } from "./ai-test-gen/InsightsPanel";
import { ActionBar } from "./ai-test-gen/ActionBar";

interface AITestGenerationProps {
  onBack: () => void;
  onProceed: () => void;
}

export function AITestGeneration({ onBack, onProceed }: AITestGenerationProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8 pb-24">
          {/* Breadcrumb */}
          <Breadcrumb onBack={onBack} />

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[#0B1F4D] mb-2">AI Test Case Generation</h1>
            <p className="text-gray-600">
              Test scenarios automatically generated based on API schema and context.
            </p>
          </div>

          {/* API Summary */}
          <APISummaryCard />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Test Cases Table - Takes 2 columns */}
            <div className="lg:col-span-2">
              <TestCasesTable />
            </div>

            {/* Insights Panel - Takes 1 column */}
            <div>
              <InsightsPanel />
            </div>
          </div>
        </main>

        {/* Fixed Bottom Action Bar */}
        <ActionBar onCancel={onBack} onProceed={onProceed} />
      </div>
    </div>
  );
}