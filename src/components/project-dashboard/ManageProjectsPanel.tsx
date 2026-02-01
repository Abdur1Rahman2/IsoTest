import type { Project } from "../ProjectDashboard";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FolderPlus, Edit2, Trash2, UserPlus, Folder } from "lucide-react";

interface ManageProjectsPanelProps {
  projects: Project[];
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onAssignUsers: (projectId: string) => void;
}

export function ManageProjectsPanel({ 
  projects, 
  onCreateProject, 
  onEditProject, 
  onDeleteProject,
  onAssignUsers 
}: ManageProjectsPanelProps) {
  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-blue-100 text-blue-700"
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-[#0F3D79]" />
          <h3 className="text-[#0B1F4D]">Manage Projects</h3>
        </div>
        <Button 
          size="sm" 
          onClick={onCreateProject}
          className="bg-gradient-to-r from-[#0F3D79] to-[#00A0B0] hover:opacity-90"
        >
          <FolderPlus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-[#00A0B0] transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#0B1F4D]">{project.name}</span>
                  <Badge className={statusColors[project.status]}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{project.apiCount} APIs</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEditProject(project)}
                className="flex-1"
              >
                <Edit2 className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAssignUsers(project.id)}
                className="flex-1"
              >
                <UserPlus className="w-3 h-3 mr-1" />
                Assign
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDeleteProject(project.id)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Folder className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No projects yet</p>
            <p className="text-sm">Create your first project to get started</p>
          </div>
        )}
      </div>
    </Card>
  );
}
