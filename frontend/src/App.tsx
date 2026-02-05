import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { TwoFactorAuthScreen } from "./components/TwoFactorAuthScreen";
import { Dashboard } from "./components/Dashboard";
import { ProjectDashboard } from "./components/ProjectDashboard";
import { AITestGeneration } from "./components/AITestGeneration";
import { EnvironmentSetup } from "./components/EnvironmentSetup";
import { ExecuteTests } from "./components/ExecuteTests";
import { BugReports } from "./components/BugReports";
import { TestReports } from "./components/TestReports";
import { Documentation } from "./components/Documentation";
import { CICDIntegration } from "./components/CICDIntegration";
import { Settings } from "./components/Settings";
import { AnalyticsTrends } from "./components/AnalyticsTrends";
import { LogoutModal } from "./components/modals/LogoutModal";
import { WalkthroughModal } from "./components/modals/WalkthroughModal";

export type UserRole = "Project Manager" | "Developer" | "QA Planner";
export type UserData = {
  email: string;
  name: string;
  role: UserRole;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "2fa" | "dashboard" | "projects" | "ai-test-gen" | "env-setup" | "execute-tests" | "bug-reports" | "test-reports" | "documentation" | "cicd-integration" | "settings" | "analytics-trends">("login");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalkthroughModal, setShowWalkthroughModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleSidebarNavigation = (menuItem: string) => {
    switch (menuItem) {
      case "Dashboard":
        setCurrentScreen("dashboard");
        break;
      case "Projects":
        setCurrentScreen("projects");
        break;
      case "API Test Creation":
        setCurrentScreen("ai-test-gen");
        break;
      case "AI Bug Reports":
        setCurrentScreen("bug-reports");
        break;
      case "Test Runs":
        setCurrentScreen("test-reports");
        break;
      case "Analytics & Trends":
        setCurrentScreen("analytics-trends");
        break;
      case "CI/CD Integration":
        setCurrentScreen("cicd-integration");
        break;
      case "Settings":
        setCurrentScreen("settings");
        break;
      case "Documentation":
        setCurrentScreen("documentation");
        break;
      default:
        break;
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setCurrentUser(null);
    setCurrentScreen("login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handle2FASuccess = () => {
    setShowWalkthroughModal(true);
  };

  const handleWalkthroughClose = () => {
    setShowWalkthroughModal(false);
    setCurrentScreen("dashboard");
  };

  const handleWalkthroughViewDocs = () => {
    setShowWalkthroughModal(false);
    setCurrentScreen("documentation");
  };

  const handleLoginSuccess = (email: string, role: string) => {
    // Map role and email to user data
    let userData: UserData;
    
    // Map realistic users based on email or role
    if (email === "biafatima789@gmail.com" || role === "manager") {
      userData = {
        email: "biafatima789@gmail.com",
        name: "Bia Fatima",
        role: "Project Manager"
      };
    } else if (email === "ahmadmustabassir@gmail.com" || role === "developer") {
      userData = {
        email: "ahmadmustabassir@gmail.com",
        name: "Ahmad Mustabassir",
        role: "Developer"
      };
    } else {
      userData = {
        email: "abdurrahman20002@gmail.com",
        name: "Abdur Rahman",
        role: "QA Planner"
      };
    }
    
    setCurrentUser(userData);
    setCurrentScreen("2fa");
  };

  if (currentScreen === "documentation") {
    return <Documentation onNavigate={handleSidebarNavigation} onLogoutClick={handleLogoutClick} onBackToDashboard={() => setCurrentScreen("dashboard")} />;
  }

  if (currentScreen === "analytics-trends") {
    return (
      <>
        <AnalyticsTrends onNavigate={handleSidebarNavigation} onLogoutClick={handleLogoutClick} />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "cicd-integration") {
    return (
      <>
        <CICDIntegration onNavigate={handleSidebarNavigation} onLogoutClick={handleLogoutClick} />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "settings") {
    return (
      <>
        <Settings onNavigate={handleSidebarNavigation} onLogoutClick={handleLogoutClick} currentUser={currentUser} />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "test-reports") {
    return (
      <>
        <TestReports onNavigate={handleSidebarNavigation} onLogoutClick={handleLogoutClick} />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "bug-reports") {
    return (
      <>
        <BugReports onNavigate={handleSidebarNavigation} onLogoutClick={handleLogoutClick} />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "execute-tests") {
    return (
      <>
        <ExecuteTests 
          onBack={() => setCurrentScreen("env-setup")} 
          onNavigateToBugReport={() => setCurrentScreen("bug-reports")} 
          onNavigate={handleSidebarNavigation} 
          onLogoutClick={handleLogoutClick}
          currentUser={currentUser}
        />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "env-setup") {
    return <EnvironmentSetup onBack={() => setCurrentScreen("ai-test-gen")} onExecute={() => setCurrentScreen("execute-tests")} currentUser={currentUser} />;
  }

  if (currentScreen === "ai-test-gen") {
    return <AITestGeneration onBack={() => setCurrentScreen("dashboard")} onProceed={() => setCurrentScreen("env-setup")} />;
  }

  if (currentScreen === "projects") {
    return (
      <>
        <ProjectDashboard 
          onNavigate={handleSidebarNavigation} 
          onLogoutClick={handleLogoutClick} 
          currentUser={currentUser}
        />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "dashboard") {
    return (
      <>
        <Dashboard onNavigateToTestGen={() => setCurrentScreen("ai-test-gen")} onNavigate={handleSidebarNavigation} onLogoutClick={handleLogoutClick} />
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
        )}
      </>
    );
  }

  if (currentScreen === "2fa") {
    return (
      <>
        <TwoFactorAuthScreen onBack={() => setCurrentScreen("login")} onVerifySuccess={handle2FASuccess} />
        {showWalkthroughModal && (
          <WalkthroughModal onClose={handleWalkthroughClose} onViewDocumentation={handleWalkthroughViewDocs} />
        )}
      </>
    );
  }

  return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}