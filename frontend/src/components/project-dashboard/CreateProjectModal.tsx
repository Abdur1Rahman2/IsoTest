import { useState } from "react";
import type { Project } from "../ProjectDashboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { FolderPlus } from "lucide-react";

interface CreateProjectModalProps {
  onClose: () => void;
  onCreate: (project: Omit<Project, "id" | "createdDate" | "isNew">) => void;
}

export function CreateProjectModal({ onClose, onCreate }: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [apiCount, setApiCount] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState<"Active" | "Pending" | "Completed">("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !apiCount || !features) return;

    onCreate({
      name,
      apiCount: parseInt(apiCount),
      features,
      assignedQA: [],
      assignedDevelopers: [],
      status
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#0B1F4D]">
            <FolderPlus className="w-5 h-5 text-[#00A0B0]" />
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name *</Label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., E-Commerce API Suite"
              required
            />
          </div>

          {/* API Count */}
          <div className="space-y-2">
            <Label htmlFor="api-count">Number of API Endpoints *</Label>
            <Input
              id="api-count"
              type="number"
              min="1"
              value={apiCount}
              onChange={(e) => setApiCount(e.target.value)}
              placeholder="e.g., 45"
              required
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label htmlFor="features">Feature Summary *</Label>
            <Textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="e.g., Payment Gateway, User Auth, Product Catalog"
              rows={3}
              required
            />
            <p className="text-xs text-gray-500">Describe the main features or modules</p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <Select value={status} onValueChange={(value: "Active" | "Pending" | "Completed") => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info Note */}
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-700">
              You can assign team members to this project after creation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#0F3D79] to-[#00A0B0] hover:opacity-90"
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
