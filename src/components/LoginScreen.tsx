import { useState } from "react";
import { LeftPanel } from "./LeftPanel";
import { LoginForm } from "./LoginForm";


interface LoginScreenProps {
  onLoginSuccess: (email: string, role: string) => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <LeftPanel />
      
      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <LoginForm 
          isSignup={isSignup} 
          onToggleMode={() => setIsSignup(!isSignup)}
          onLoginSuccess={onLoginSuccess}
        />
      </div>
    </div>
  );
}