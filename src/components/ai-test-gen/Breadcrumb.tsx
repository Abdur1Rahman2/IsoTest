import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  onBack: () => void;
}

export function Breadcrumb({ onBack }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <button 
        onClick={onBack}
        className="text-gray-500 hover:text-[#1B4DFF] transition-colors"
      >
        Dashboard
      </button>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-gray-500">API Test Creation</span>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-[#0B1F4D]">AI Test Case Generation</span>
    </div>
  );
}
