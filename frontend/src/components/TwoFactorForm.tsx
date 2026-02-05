import { useState, useRef, useEffect } from "react";
import { Shield, ArrowLeft } from "lucide-react";

interface TwoFactorFormProps {
  onBack: () => void;
  onVerifySuccess: () => void;
}

export function TwoFactorForm({ onBack, onVerifySuccess }: TwoFactorFormProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(179); // 2:59 in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      console.log("Verification code submitted:", fullCode);
      // Simulate successful verification
      onVerifySuccess();
    }
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
    setTimeLeft(179);
    inputRefs.current[0]?.focus();
    console.log("Resending verification code...");
  };

  return (
    <div className="w-full max-w-md">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-[#1B4DFF] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </button>

      {/* Header with Icon */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-[#1B4DFF]/10 to-[#00A0B0]/10 rounded-2xl">
          <Shield className="w-8 h-8 text-[#1B4DFF]" strokeWidth={2} />
        </div>
        <h2 className="text-[#0B1F4D] mb-2">Two-Factor Authentication</h2>
        <p className="text-gray-600 mb-4">
          Secure access using AI-powered automation standards.
        </p>
        <p className="text-gray-700">
          Enter the 6-digit verification code sent to your email.
        </p>
        <p className="text-gray-500 mt-2">
          qa******@domain.com
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code Input Boxes */}
        <div>
          <label className="block text-gray-700 mb-3 text-center">
            Verification Code
          </label>
          <div className="flex gap-3 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent transition-all"
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="text-center">
          <p className="text-gray-600">
            Code expires in:{" "}
            <span className={`${timeLeft <= 30 ? "text-red-500" : "text-[#1B4DFF]"}`}>
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={code.join("").length !== 6}
          className="w-full bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white py-3 rounded-xl hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          Verify Code
        </button>

        {/* Resend Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-gray-600 hover:text-[#1B4DFF] transition-colors"
          >
            Didn't receive the code?{" "}
            <span className="text-[#1B4DFF]">Resend</span>
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          Designed by FYP Team – Bahria University 2025
        </p>
      </div>
    </div>
  );
}