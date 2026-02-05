import { useState } from "react";
import { X, ChevronRight, ChevronLeft, BookOpen, Sparkles } from "lucide-react";

interface WalkthroughModalProps {
  onClose: () => void;
  onViewDocumentation: () => void;
}

const walkthroughSteps = [
  {
    id: 1,
    title: "Welcome to IsoTest AI!",
    description: "Your AI-powered API testing platform",
    content: "IsoTest AI combines artificial intelligence with isolated testing environments to help you build reliable APIs faster. Let's take a quick tour of the platform's key features.",
    icon: "🚀",
  },
  {
    id: 2,
    title: "Dashboard Overview",
    description: "Monitor your testing metrics",
    content: "The dashboard provides real-time insights into your testing activities. View total tests executed, pass rates, active projects, and recent activity all in one place.",
    icon: "📊",
  },
  {
    id: 3,
    title: "AI Test Creation",
    description: "Generate tests automatically",
    content: "Simply upload your Swagger/OpenAPI schema or describe your API in natural language. Our AI will analyze it and generate comprehensive test cases covering common scenarios, edge cases, and security vulnerabilities.",
    icon: "✨",
  },
  {
    id: 4,
    title: "AI Case Generation",
    description: "Review and customize tests",
    content: "All generated tests come with confidence scores. Review each test case, customize parameters, add assertions, or create your own tests from scratch before execution.",
    icon: "🧪",
  },
  {
    id: 5,
    title: "Test Execution",
    description: "Run tests in isolation",
    content: "Execute your test suite in isolated Docker containers with real-time console logging. Watch as each test runs and see immediate feedback with AI-powered interpretation of results.",
    icon: "▶️",
  },
  {
    id: 6,
    title: "Bug Report System",
    description: "Intelligent debugging",
    content: "When tests fail, IsoTest AI automatically generates detailed bug reports with steps to reproduce, root cause analysis, and suggested fixes. Export reports as PDF or JSON.",
    icon: "🐛",
  },
  {
    id: 7,
    title: "Historical Analytics",
    description: "Track progress over time",
    content: "View test history, track regressions, analyze failure trends, and optimize your API quality with comprehensive analytics and reporting tools.",
    icon: "📈",
  },
];

export function WalkthroughModal({ onClose, onViewDocumentation }: WalkthroughModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    onClose();
  };

  const currentStepData = walkthroughSteps[currentStep];
  const isLastStep = currentStep === walkthroughSteps.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
        {/* Modal */}
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 animate-scale-in">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#1B4DFF] to-[#00A0B0] rounded-lg">
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[#0B1F4D]">Platform Walkthrough</h3>
                <p className="text-sm text-gray-600">
                  Step {currentStep + 1} of {walkthroughSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Skip Walkthrough"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {walkthroughSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0]"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentStepData.icon}</div>
              <h2 className="text-2xl text-[#0B1F4D] mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-[#00A0B0] mb-4">{currentStepData.description}</p>
              <p className="text-gray-700 leading-relaxed max-w-xl mx-auto">
                {currentStepData.content}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip Walkthrough
            </button>

            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}

              {!isLastStep ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={onViewDocumentation}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    View Documentation
                  </button>
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
