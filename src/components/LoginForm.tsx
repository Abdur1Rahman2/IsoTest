import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ChangePasswordModal } from "./modals/ChangePasswordModal";

interface LoginFormProps {
  isSignup: boolean;
  onToggleMode: () => void;
  onLoginSuccess: (email: string, role: string) => void;
}

export function LoginForm({
  isSignup,
  onToggleMode,
  onLoginSuccess,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      // LOGIN API
      const response = await fetch(
        `${baseUrl}/Auth/IAuthFeature/Login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login response data:", data);

      // GENERATE OTP
      const otpResponse = await fetch(
        `${baseUrl}/Auth/IAuthFeature/GenerateOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            DeviceId: "534534",
          },
          body: JSON.stringify({
            email: data.data.email,
          }),
        }
      );

      if (!otpResponse.ok) {
        throw new Error("OTP generation failed");
      }

      console.log("OTP generated successfully");

      // MOVE TO 2FA
      onLoginSuccess(
        data?.data?.email ?? formData.email,
        data?.data?.role ?? ""
      );
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[#0B1F4D] mb-2">
          Welcome to IsoTest AI
        </h2>
        <p className="text-gray-600">
          Sign in to continue. Role-based access enabled.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1B4DFF]"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-xl pr-12 focus:ring-2 focus:ring-[#1B4DFF]"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        {!isSignup && (
          <div className="text-right">
            <button
              type="button"
              onClick={() =>
                setShowChangePassword(true)
              }
              className="text-[#1B4DFF] hover:text-[#00A0B0]"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white py-3 rounded-xl"
        >
          Log In
        </button>

        {/* Toggle */}
        <div className="text-center text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-[#1B4DFF]"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <span className="text-gray-500">
                Contact administrator.
              </span>
            </>
          )}
        </div>
      </form>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePasswordModal
          onClose={() =>
            setShowChangePassword(false)
          }
        />
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          Designed & Developed by FYP Team | Bahria University 2025
        </p>
      </div>
    </div>
  );
}
