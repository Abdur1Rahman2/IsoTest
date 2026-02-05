import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Settings as SettingsIcon, User, Shield } from "lucide-react";
import { useState } from "react";
import type { UserData } from "../App";

interface SettingsProps {
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
  currentUser: UserData | null;
}

export function Settings({ onNavigate, onLogoutClick, currentUser }: SettingsProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [timeout, setTimeout] = useState<string>("300");

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  const handleUpdateProfile = () => {
    console.log("Update profile clicked");
  };

  const handleInviteMember = () => {
    console.log("Invite team member clicked");
    // This would open the AddMemberModal from ProjectDashboard
  };

  const handleSaveChanges = () => {
    console.log("Settings saved:", { darkMode, timeout });
  };

  const isPM = currentUser?.role === "Project Manager";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="Settings" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <SettingsIcon className="w-6 h-6 text-[#1B4DFF]" />
              <h1 className="text-[#0B1F4D]">Settings</h1>
            </div>
            <p className="text-gray-600">
              Manage account preferences and platform configuration.
            </p>
          </div>

          {/* User Account Management */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#1B4DFF]" />
              <h2 className="text-[#0B1F4D]">User Account Management</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={currentUser?.name || ""}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentUser?.email || ""}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  type="text"
                  value={currentUser?.role || ""}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleChangePassword} variant="outline">
                  Change Password
                </Button>
                <Button onClick={handleUpdateProfile} className="bg-[#1B4DFF] text-white">
                  Update Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Platform Settings */}
          <Card className="p-6 mb-6">
            <h2 className="text-[#0B1F4D] mb-4">Platform Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Toggle between light and dark theme</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div>
                <Label htmlFor="timeout">Default Test Execution Timeout (seconds)</Label>
                <Select value={timeout} onValueChange={setTimeout}>
                  <SelectTrigger id="timeout" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 seconds</SelectItem>
                    <SelectItem value="120">120 seconds</SelectItem>
                    <SelectItem value="300">300 seconds (5 minutes)</SelectItem>
                    <SelectItem value="600">600 seconds (10 minutes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleInviteMember}
                  className="text-[#1B4DFF] hover:underline"
                >
                  Invite new team member →
                </button>
              </div>
            </div>
          </Card>

          {/* Admin-only Options */}
          {isPM && (
            <Card className="p-6 mb-6 border-2 border-[#00A0B0]">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#00A0B0]" />
                <h2 className="text-[#0B1F4D]">Admin Options</h2>
                <span className="text-xs bg-[#00A0B0] text-white px-2 py-1 rounded">
                  Project Manager Only
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Manage team members, roles, and access control across projects.
              </p>
              <Button
                onClick={() => onNavigate && onNavigate("Projects")}
                className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white"
              >
                Manage User Roles & Access
              </Button>
            </Card>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center gap-3">
            <Button onClick={handleSaveChanges} className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white">
              Save Changes
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
