import { useState } from "react";
import type { Project, Member } from "../ProjectDashboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { UserPlus } from "lucide-react";

interface AddMemberModalProps {
  projects: Project[];
  onClose: () => void;
  onSave: (member: Omit<Member, "id">) => void;
}

export function AddMemberModal({ projects, onClose, onSave }: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"QA Planner" | "Developer">("QA Planner");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onSave({
      name,
      email,
      role,
      assignedProjects: selectedProjects
    });
  };

  const toggleProject = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#0B1F4D]">
            <UserPlus className="w-5 h-5 text-[#00A0B0]" />
            Add Team Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter member name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@company.com"
              required
            />
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select value={role} onValueChange={(value: "QA Planner" | "Developer") => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="QA Planner">QA Planner</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assign to Projects */}
          <div className="space-y-2">
            <Label>Assign to Projects (Optional)</Label>
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`project-${project.id}`}
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => toggleProject(project.id)}
                  />
                  <label
                    htmlFor={`project-${project.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {project.name}
                  </label>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-2">No projects available</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
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
              Save Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}