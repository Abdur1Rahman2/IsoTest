import { LeftPanel } from "./LeftPanel";
import { TwoFactorForm } from "./TwoFactorForm";

interface TwoFactorAuthScreenProps {
  email: string;
  onBack: () => void;
  onVerifySuccess: () => void;
}

export function TwoFactorAuthScreen({
  email,
  onBack,
  onVerifySuccess,
}: TwoFactorAuthScreenProps) {
  return (
    <div className="flex min-h-screen">
      <LeftPanel />
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <TwoFactorForm
          email={email}
          onBack={onBack}
          onVerifySuccess={onVerifySuccess}
        />
      </div>
    </div>
  );
}
