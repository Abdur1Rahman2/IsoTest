import { useState } from "react";
import { 
  LayoutDashboard, 
  FileCode, 
  Play, 
  Bug, 
  TrendingUp, 
  GitBranch, 
  Settings, 
  BookOpen, 
  LogOut,
  Cpu,
  Orbit,
  FolderKanban
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderKanban, label: "Projects", active: false },
  { icon: FileCode, label: "API Test Creation", active: false },
  { icon: Play, label: "Test Runs", active: false },
  { icon: Bug, label: "AI Bug Reports", active: false },
  { icon: TrendingUp, label: "Analytics & Trends", active: false },
  { icon: GitBranch, label: "CI/CD Integration", active: false },
  { icon: Settings, label: "Settings", active: false },
];

interface SidebarProps {
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
}

export function Sidebar({ activeScreen = "Dashboard", onNavigate, onLogoutClick }: SidebarProps) {
  const [activeItem, setActiveItem] = useState(activeScreen);

  const handleClick = (label: string) => {
    setActiveItem(label);
    if (onNavigate) {
      onNavigate(label);
    }
  };

  const handleDocumentation = () => {
    setActiveItem("Documentation");
    if (onNavigate) {
      onNavigate("Documentation");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Cpu className="w-8 h-8 text-[#1B4DFF]" strokeWidth={1.5} />
            <Orbit className="w-4 h-4 absolute -top-0.5 -right-0.5 text-[#00A0B0]" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-[#0B1F4D]">IsoTest AI</h3>
            <p className="text-xs text-gray-500">API Tester</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#1B4DFF]/10 to-[#00A0B0]/10 text-[#1B4DFF]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <button 
          onClick={handleDocumentation}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeItem === "Documentation"
              ? "bg-gradient-to-r from-[#1B4DFF]/10 to-[#00A0B0]/10 text-[#1B4DFF]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <BookOpen className="w-5 h-5" strokeWidth={1.5} />
          <span>Documentation</span>
        </button>
        <button 
          onClick={onLogoutClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}