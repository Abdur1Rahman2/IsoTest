import { LeftPanel } from "./LeftPanel";
import { TwoFactorForm } from "./TwoFactorForm";

interface TwoFactorAuthScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
}

export function TwoFactorAuthScreen({ onBack, onVerifySuccess }: TwoFactorAuthScreenProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <LeftPanel />
      
      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <TwoFactorForm onBack={onBack} onVerifySuccess={onVerifySuccess} />
      </div>
    </div>
  );
}