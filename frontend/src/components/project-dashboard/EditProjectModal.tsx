import { useState } from "react";
import type { Project } from "../ProjectDashboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Edit2 } from "lucide-react";

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export function EditProjectModal({ project, onClose, onSave }: EditProjectModalProps) {
  const [name, setName] = useState(project.name);
  const [apiCount, setApiCount] = useState(project.apiCount.toString());
  const [features, setFeatures] = useState(project.features);
  const [status, setStatus] = useState<"Active" | "Pending" | "Completed">(project.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !apiCount || !features) return;

    onSave({
      ...project,
      name,
      apiCount: parseInt(apiCount),
      features,
      status
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#0B1F4D]">
            <Edit2 className="w-5 h-5 text-[#00A0B0]" />
            Edit Project Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-project-name">Project Name *</Label>
            <Input
              id="edit-project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., E-Commerce API Suite"
              required
            />
          </div>

          {/* API Count */}
          <div className="space-y-2">
            <Label htmlFor="edit-api-count">Number of API Endpoints *</Label>
            <Input
              id="edit-api-count"
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
            <Label htmlFor="edit-features">Feature Summary *</Label>
            <Textarea
              id="edit-features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="e.g., Payment Gateway, User Auth, Product Catalog"
              rows={3}
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="edit-status">Project Status</Label>
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

          {/* Created Date (Read-only) */}
          <div className="space-y-2">
            <Label>Created Date</Label>
            <Input
              value={new Date(project.createdDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              disabled
              className="bg-gray-50"
            />
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
