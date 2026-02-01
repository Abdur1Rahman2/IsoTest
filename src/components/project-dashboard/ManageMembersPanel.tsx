import type { Member, Project } from "../ProjectDashboard";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { UserPlus, Trash2, Users } from "lucide-react";

interface ManageMembersPanelProps {
  members: Member[];
  projects: Project[];
  onAddMember: () => void;
  onDeleteMember: (memberId: string) => void;
  onAssignToProject: (memberId: string) => void;
}

export function ManageMembersPanel({ 
  members, 
  projects,
  onAddMember, 
  onDeleteMember,
  onAssignToProject 
}: ManageMembersPanelProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#0F3D79]" />
          <h3 className="text-[#0B1F4D]">Manage Members</h3>
        </div>
        <Button 
          size="sm" 
          onClick={onAddMember}
          className="bg-gradient-to-r from-[#0F3D79] to-[#00A0B0] hover:opacity-90"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {members.map((member) => (
          <div 
            key={member.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-[#00A0B0] transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#0B1F4D]">{member.name}</span>
                  <Badge className={
                    member.role === "QA Engineer" 
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }>
                    {member.role}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDeleteMember(member.id)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Assigned Projects */}
            {member.assignedProjects.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Assigned to:</p>
                <div className="flex flex-wrap gap-1">
                  {member.assignedProjects.map((projectId) => {
                    const project = projects.find(p => p.id === projectId);
                    return project ? (
                      <span 
                        key={projectId}
                        className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700"
                      >
                        {project.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        ))}

        {members.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No members yet</p>
            <p className="text-sm">Add your first team member to get started</p>
          </div>
        )}
      </div>
    </Card>
  );
}
