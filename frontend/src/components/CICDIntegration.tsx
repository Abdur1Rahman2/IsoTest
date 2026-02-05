import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GitBranch, CheckCircle2, XCircle, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";

interface CICDIntegrationProps {
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
}

export function CICDIntegration({ onNavigate, onLogoutClick }: CICDIntegrationProps) {
  const [platform, setPlatform] = useState<string>("");
  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [autoTest, setAutoTest] = useState<boolean>(false);
  const [triggerOption, setTriggerOption] = useState<string>("pull-request");

  const pipelineRuns = [
    { id: "RUN-7823", status: "success", timestamp: "2025-11-30 09:15 AM", session: "TEST-5642" },
    { id: "RUN-7821", status: "failed", timestamp: "2025-11-30 08:42 AM", session: "TEST-5641" },
    { id: "RUN-7819", status: "success", timestamp: "2025-11-30 07:30 AM", session: "TEST-5640" },
    { id: "RUN-7817", status: "running", timestamp: "2025-11-30 07:15 AM", session: "TEST-5639" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "running":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      success: "bg-green-100 text-green-700 border-green-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      running: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return (
      <Badge className={`${variants[status]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="CI/CD Integration" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="w-6 h-6 text-[#1B4DFF]" />
              <h1 className="text-[#0B1F4D]">CI/CD Integration</h1>
            </div>
            <p className="text-gray-600">
              Connect IsoTest AI with CI/CD pipelines for automated test execution.
            </p>
          </div>

          {/* Pipeline Configuration */}
          <Card className="p-6 mb-6">
            <h2 className="text-[#0B1F4D] mb-4">Pipeline Configuration</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="platform">CI/CD Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform" className="mt-1">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="github-actions">GitHub Actions</SelectItem>
                    <SelectItem value="jenkins">Jenkins</SelectItem>
                    <SelectItem value="azure-devops">Azure DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="repo-url">Repository URL</Label>
                <Input
                  id="repo-url"
                  type="text"
                  placeholder="https://github.com/your-org/your-repo"
                  value={repositoryUrl}
                  onChange={(e) => setRepositoryUrl(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="access-token">Access Token / API Key</Label>
                <Input
                  id="access-token"
                  type="password"
                  placeholder="Enter your access token"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="auto-test"
                  checked={autoTest}
                  onCheckedChange={(checked) => setAutoTest(checked as boolean)}
                />
                <Label htmlFor="auto-test" className="cursor-pointer">
                  Enable auto-test on commit
                </Label>
              </div>

              <Button className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white hover:shadow-lg">
                Save Configuration
              </Button>
            </div>
          </Card>

          {/* Trigger Settings */}
          <Card className="p-6 mb-6">
            <h2 className="text-[#0B1F4D] mb-4">Trigger Settings</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="pull-request"
                    name="trigger"
                    value="pull-request"
                    checked={triggerOption === "pull-request"}
                    onChange={(e) => setTriggerOption(e.target.value)}
                    className="w-4 h-4 text-[#1B4DFF]"
                  />
                  <Label htmlFor="pull-request" className="cursor-pointer">
                    Run tests after pull request
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="merge"
                    name="trigger"
                    value="merge"
                    checked={triggerOption === "merge"}
                    onChange={(e) => setTriggerOption(e.target.value)}
                    className="w-4 h-4 text-[#1B4DFF]"
                  />
                  <Label htmlFor="merge" className="cursor-pointer">
                    Run tests on merge
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="nightly"
                    name="trigger"
                    value="nightly"
                    checked={triggerOption === "nightly"}
                    onChange={(e) => setTriggerOption(e.target.value)}
                    className="w-4 h-4 text-[#1B4DFF]"
                  />
                  <Label htmlFor="nightly" className="cursor-pointer">
                    Nightly scheduled
                  </Label>
                </div>
              </div>

              <Button variant="outline" className="border-[#1B4DFF] text-[#1B4DFF]">
                Test Trigger Now
              </Button>
            </div>
          </Card>

          {/* Previous Pipeline Runs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#0B1F4D]">Previous Pipeline Runs</h2>
              <Button variant="link" className="text-[#1B4DFF]">
                View All Runs
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Run ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Timestamp</th>
                    <th className="text-left py-3 px-4 text-gray-600">Linked Test Session</th>
                  </tr>
                </thead>
                <tbody>
                  {pipelineRuns.map((run) => (
                    <tr key={run.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-[#0B1F4D]">{run.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(run.status)}
                          {getStatusBadge(run.status)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{run.timestamp}</td>
                      <td className="py-3 px-4">
                        <button className="flex items-center gap-1 text-[#1B4DFF] hover:underline">
                          {run.session}
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bottom Action */}
          <div className="flex justify-end mt-6">
            <Button 
              onClick={() => onNavigate && onNavigate("Test Runs")}
              className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white hover:shadow-lg"
            >
              Go to Test Runs
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
