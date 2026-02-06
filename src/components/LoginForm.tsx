import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  isSignup: boolean;
  onToggleMode: () => void;
  onLoginSuccess: (email: string, role: string) => void;
}

export function LoginForm({ isSignup, onToggleMode, onLoginSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });

  const [genOtpData, setGenOtpData] = useState({
    email: ""

  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite
      // const baseUrl = process.env.REACT_APP_API_BASE_URL; // CRA

      const response = await fetch(`${baseUrl}/Auth/IAuthFeature/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login response data:", data);

      const otpPayload = { email: data.data.email };
      setGenOtpData(otpPayload);

      try {

        console.log("otpPayload DATA: ", otpPayload);

        let OtpformData = {
          email: otpPayload.email
        }


        const responseotp = await fetch(`${baseUrl}/Auth/IAuthFeature/GenerateOTP`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "DeviceId": "534534",
          },
          // body: JSON.stringify(otpPayload.email),
          body: JSON.stringify(OtpformData),

        });
        console.log("responseotp data", responseotp);
      
      } catch (error) {
        console.log("Error generating OTP:", error);
        alert("Error in Generating otp");

      }
      
      
console.log(
  "LOGINFORM → calling onLoginSuccess with:",
  data?.data?.email ?? formData.email,
  data?.data?.role ?? data?.role
);

      // Simulate successful login and move to 2FA
 onLoginSuccess(data?.data?.email ?? formData.email, data?.data?.role ?? data?.role ?? "");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login Failed!");
    }
    

  };


  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[#0B1F4D] mb-2">Welcome to IsoTest AI</h2>
        <p className="text-gray-600">
          Sign in to continue. Role-based access enabled for QA Engineers, Developers, and Test Managers.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent transition-all"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent transition-all pr-12"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password (only in signup mode) */}
        {/* {isSignup && (
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent transition-all pr-12"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )} */}

        {/* Role Selector */}
        {/* <div>
          <label htmlFor="role" className="block text-gray-700 mb-2">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent transition-all bg-white cursor-pointer"
          >
            <option value="qa-engineer">QA Engineer</option>
            <option value="developer">Developer</option>
            <option value="manager">Project Manager</option>
          </select>
        </div> */}

        {/* Remember Me & Terms */}
        {/* <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="w-4 h-4 text-[#1B4DFF] border-gray-300 rounded focus:ring-[#1B4DFF] cursor-pointer"
            />
            <span className="text-gray-700">Remember me</span>
          </label>

          {isSignup && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="w-4 h-4 text-[#1B4DFF] border-gray-300 rounded focus:ring-[#1B4DFF] cursor-pointer"
                required
              />
              <span className="text-gray-700">I accept the Terms & Conditions</span>
            </label>
          )}
        </div> */}

        {/* Forgot Password Link */}
        {!isSignup && (
          <div className="text-right">
            <a href="#" className="text-[#1B4DFF] hover:text-[#00A0B0] transition-colors">
              Forgot Password?
            </a>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white py-3 rounded-xl hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all"
        >
          {isSignup ? "Create Account" : "Log In"}
        </button>

        {/* Toggle Mode */}
        <div className="text-center text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-[#1B4DFF] hover:text-[#00A0B0] transition-colors"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span className="text-gray-500">Contact project administrator.</span>
            </>
          )}
        </div>
      </form>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          Designed & Developed by FYP Team | Bahria University 2025
        </p>
      </div>
    </div>
  );
}