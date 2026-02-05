import { useState } from "react";
import type { Project, Member } from "../ProjectDashboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { UserPlus, Users } from "lucide-react";

interface AssignUsersModalProps {
  project: Project;
  members: Member[];
  onClose: () => void;
  onAssign: (projectId: string, userIds: string[]) => void;
}

export function AssignUsersModal({ project, members, onClose, onAssign }: AssignUsersModalProps) {
  // Get currently assigned member IDs
  const initiallyAssigned = members
    .filter(m => 
      project.assignedQA.includes(m.name) || 
      project.assignedDevelopers.includes(m.name)
    )
    .map(m => m.id);

  const [selectedUsers, setSelectedUsers] = useState<string[]>(initiallyAssigned);

  const handleSubmit = () => {
    onAssign(project.id, selectedUsers);
  };

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#0B1F4D]">
            <UserPlus className="w-5 h-5 text-[#00A0B0]" />
            Assign Users to Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Project Info */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-[#0F3D79]/5 to-[#00A0B0]/5 border border-[#00A0B0]/20">
            <p className="text-[#0B1F4D] mb-1">{project.name}</p>
            <p className="text-sm text-gray-600">{project.apiCount} API Endpoints</p>
          </div>

          {/* User Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Select Team Members
            </Label>
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-3">
              {members.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <Checkbox
                    id={`user-${member.id}`}
                    checked={selectedUsers.includes(member.id)}
                    onCheckedChange={() => toggleUser(member.id)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`user-${member.id}`}
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#0B1F4D]">{member.name}</span>
                      <Badge className={
                        member.role === "QA Engineer" 
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }>
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </label>
                </div>
              ))}

              {members.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Users className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No team members available</p>
                </div>
              )}
            </div>
          </div>

          {/* Selected Count */}
          <div className="text-sm text-gray-600">
            <span className="text-[#0F3D79]">{selectedUsers.length}</span> member(s) selected
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
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#0F3D79] to-[#00A0B0] hover:opacity-90"
            >
              Assign Users
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm text-gray-700 mb-2 ${className}`}>{children}</div>;
}
