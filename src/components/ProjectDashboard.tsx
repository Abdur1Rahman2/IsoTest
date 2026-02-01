import { useState, useEffect } from "react";
import { Sidebar } from "./dashboard/Sidebar";
import { TopBar } from "./dashboard/TopBar";
import { ProjectCard } from "./project-dashboard/ProjectCard";
import { ManageMembersPanel } from "./project-dashboard/ManageMembersPanel";
import { ManageProjectsPanel } from "./project-dashboard/ManageProjectsPanel";
import { AddMemberModal } from "./project-dashboard/AddMemberModal";
import { AssignUsersModal } from "./project-dashboard/AssignUsersModal";
import { CreateProjectModal } from "./project-dashboard/CreateProjectModal";
import { EditProjectModal } from "./project-dashboard/EditProjectModal";
import { Button } from "./ui/button";
import { ChevronRight, Plus, ArrowRight } from "lucide-react";
import type { UserData } from "../App";

interface ProjectDashboardProps {
  onNavigate?: (screen: string) => void;
  onLogoutClick?: () => void;
  currentUser?: UserData | null;
}

export interface Project {
  id: string;
  name: string;
  createdDate: string;
  apiCount: number;
  features: string;
  assignedQA: string[];
  assignedDevelopers: string[];
  status: "Active" | "Pending" | "Completed";
  isNew?: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Project Manager" | "Developer" | "QA Planner";
  assignedProjects: string[];
}

export function ProjectDashboard({ 
  onNavigate, 
  onLogoutClick,
  currentUser
}: ProjectDashboardProps) {
  const userRole = currentUser?.role || "Project Manager";
  const isPM = userRole === "Project Manager";
  
  // Sample data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-Commerce API Suite",
      createdDate: "2025-11-28",
      apiCount: 45,
      features: "Payment Gateway, User Auth, Product Catalog",
      assignedQA: ["Abdur Rahman"],
      assignedDevelopers: ["Ahmad Mustabassir"],
      status: "Active",
      isNew: true
    },
    {
      id: "2",
      name: "Banking Core Services",
      createdDate: "2025-11-20",
      apiCount: 78,
      features: "Transaction API, Account Management, Audit Logs",
      assignedQA: ["Abdur Rahman"],
      assignedDevelopers: ["Ahmad Mustabassir"],
      status: "Active"
    },
    {
      id: "3",
      name: "Healthcare Management System",
      createdDate: "2025-11-15",
      apiCount: 32,
      features: "Patient Records, Appointments, Billing",
      assignedQA: ["Abdur Rahman"],
      assignedDevelopers: [],
      status: "Pending"
    },
    {
      id: "4",
      name: "Logistics Tracking Platform",
      createdDate: "2025-11-10",
      apiCount: 56,
      features: "Shipment Tracking, Route Optimization, Fleet Management",
      assignedQA: [],
      assignedDevelopers: ["Ahmad Mustabassir"],
      status: "Completed"
    }
  ]);

  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Bia Fatima",
      email: "biafatima789@gmail.com",
      role: "Project Manager",
      assignedProjects: []
    },
    {
      id: "2",
      name: "Ahmad Mustabassir",
      email: "ahmadmustabassir@gmail.com",
      role: "Developer",
      assignedProjects: ["1", "2", "4"]
    },
    {
      id: "3",
      name: "Abdur Rahman",
      email: "abdurrahman20002@gmail.com",
      role: "QA Planner",
      assignedProjects: ["1", "2", "3"]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAssignUsersModal, setShowAssignUsersModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToAssign, setProjectToAssign] = useState<string | null>(null);

  // Filter projects based on role
  const displayedProjects = isPM 
    ? projects 
    : projects.filter(p => {
        const userName = currentUser?.name || "";
        return p.assignedQA.includes(userName) || p.assignedDevelopers.includes(userName);
      });

  // Remove "isNew" flag after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(prev => prev.map(p => ({ ...p, isNew: false })));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddMember = (memberData: Omit<Member, "id">) => {
    const newMember: Member = {
      ...memberData,
      id: Date.now().toString()
    };
    setMembers([...members, newMember]);
    setShowAddMemberModal(false);
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  const handleCreateProject = (projectData: Omit<Project, "id" | "createdDate" | "isNew">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      isNew: true
    };
    setProjects([newProject, ...projects]);
    setShowCreateProjectModal(false);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const handleEditProject = (projectData: Project) => {
    setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
    setShowEditProjectModal(false);
    setProjectToEdit(null);
  };

  const handleAssignUsers = (projectId: string, userIds: string[]) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const qas = members.filter(m => userIds.includes(m.id) && m.role === "QA Planner").map(m => m.name);
    const devs = members.filter(m => userIds.includes(m.id) && m.role === "Developer").map(m => m.name);

    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, assignedQA: qas, assignedDevelopers: devs }
        : p
    ));

    // Update members' assigned projects
    setMembers(members.map(m => 
      userIds.includes(m.id)
        ? { ...m, assignedProjects: [...new Set([...m.assignedProjects, projectId])] }
        : m
    ));

    setShowAssignUsersModal(false);
    setProjectToAssign(null);
  };

  const openAssignModal = (projectId: string) => {
    setProjectToAssign(projectId);
    setShowAssignUsersModal(true);
  };

  const openEditModal = (project: Project) => {
    setProjectToEdit(project);
    setShowEditProjectModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeScreen="Projects" onNavigate={onNavigate} onLogoutClick={onLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <main className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0F3D79]">Projects</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[#0B1F4D] mb-2">Project Dashboard</h1>
            <p className="text-gray-600">View and manage API testing projects based on your assigned role.</p>
          </div>

          {/* Role Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              userRole === "Project Manager" 
                ? "bg-purple-100 text-purple-700"
                : userRole === "QA Planner"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}>
              {userRole}
            </span>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Section - Projects */}
            <div className="xl:col-span-2 space-y-6">
              {/* Projects Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-[#0B1F4D]">Your Projects</h2>
                {isPM && (
                  <Button 
                    onClick={() => setShowCreateProjectModal(true)}
                    className="bg-gradient-to-r from-[#0F3D79] to-[#00A0B0] hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Project
                  </Button>
                )}
              </div>

              {/* Project Cards */}
              <div className="grid gap-4">
                {displayedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isPM={isPM}
                    isSelected={selectedProject === project.id}
                    onSelect={() => setSelectedProject(project.id)}
                    onEdit={() => openEditModal(project)}
                    onDelete={() => handleDeleteProject(project.id)}
                    onAssign={() => openAssignModal(project.id)}
                  />
                ))}
              </div>

              {/* Action Button */}
              {selectedProject && (
                <div className="pt-4">
                  <Button 
                    className="bg-gradient-to-r from-[#0F3D79] to-[#00A0B0] hover:opacity-90"
                    size="lg"
                  >
                    Go to Test Environment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>

            {/* Right Section - PM Only Panels */}
            {isPM && (
              <div className="space-y-6">
                <ManageMembersPanel 
                  members={members}
                  projects={projects}
                  onAddMember={() => setShowAddMemberModal(true)}
                  onDeleteMember={handleDeleteMember}
                  onAssignToProject={(memberId) => {
                    // Find member's projects and allow reassignment
                    console.log("Assign member", memberId);
                  }}
                />

                <ManageProjectsPanel 
                  projects={projects}
                  onCreateProject={() => setShowCreateProjectModal(true)}
                  onEditProject={openEditModal}
                  onDeleteProject={handleDeleteProject}
                  onAssignUsers={openAssignModal}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Designed by FYP Team – Bahria University 2025
            </p>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showAddMemberModal && (
        <AddMemberModal
          projects={projects}
          onClose={() => setShowAddMemberModal(false)}
          onSave={handleAddMember}
        />
      )}

      {showAssignUsersModal && projectToAssign && (
        <AssignUsersModal
          project={projects.find(p => p.id === projectToAssign)!}
          members={members}
          onClose={() => {
            setShowAssignUsersModal(false);
            setProjectToAssign(null);
          }}
          onAssign={handleAssignUsers}
        />
      )}

      {showCreateProjectModal && (
        <CreateProjectModal
          onClose={() => setShowCreateProjectModal(false)}
          onCreate={handleCreateProject}
        />
      )}

      {showEditProjectModal && projectToEdit && (
        <EditProjectModal
          project={projectToEdit}
          onClose={() => {
            setShowEditProjectModal(false);
            setProjectToEdit(null);
          }}
          onSave={handleEditProject}
        />
      )}
    </div>
  );
}