import type { Project } from "../ProjectDashboard";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, FileCode, Users, Edit2, Trash2, UserPlus } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isPM: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAssign: () => void;
}

export function ProjectCard({ 
  project, 
  isPM, 
  isSelected, 
  onSelect, 
  onEdit, 
  onDelete, 
  onAssign 
}: ProjectCardProps) {
  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-blue-100 text-blue-700"
  };

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? "ring-2 ring-[#00A0B0] shadow-lg" : ""
      } ${
        project.isNew ? "animate-pulse-glow" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0F3D79] to-[#00A0B0] flex items-center justify-center">
              <FileCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-[#0B1F4D]">{project.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.createdDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>

        <Badge className={statusColors[project.status]}>
          {project.status}
        </Badge>
      </div>

      {/* Project Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <FileCode className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">
            <span className="text-[#0F3D79]">{project.apiCount}</span> API Endpoints
          </span>
        </div>

        <div className="text-sm text-gray-600">
          <span className="text-gray-500">Features:</span> {project.features}
        </div>

        {/* Assigned Team */}
        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 text-gray-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-2">Assigned To:</p>
            <div className="flex flex-wrap gap-2">
              {project.assignedQA.map((qa, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700"
                >
                  {qa} (QA Planner)
                </span>
              ))}
              {project.assignedDevelopers.map((dev, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-50 text-green-700"
                >
                  {dev} (Developer)
                </span>
              ))}
              {project.assignedQA.length === 0 && project.assignedDevelopers.length === 0 && (
                <span className="text-xs text-gray-400 italic">No members assigned yet</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions - Only for PM */}
      {isPM && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex-1"
          >
            <Edit2 className="w-3 h-3 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAssign();
            }}
            className="flex-1"
          >
            <UserPlus className="w-3 h-3 mr-2" />
            Assign
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* View Only Badge for Non-PM */}
      {!isPM && (
        <div className="pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500 italic">View Only Access</span>
        </div>
      )}
    </Card>
  );
}