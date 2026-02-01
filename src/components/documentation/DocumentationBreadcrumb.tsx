import { ChevronRight } from "lucide-react";

export function DocumentationBreadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <span className="text-gray-500">Dashboard</span>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-[#0B1F4D]">Documentation</span>
    </div>
  );
}
