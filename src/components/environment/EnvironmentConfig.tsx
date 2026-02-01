import { useState } from "react";
import { Database, Container, Globe } from "lucide-react";

export function EnvironmentConfig() {
  const [config, setConfig] = useState({
    envType: "docker",
    dbImage: "postgres:latest",
    resetPolicy: "per-test",
    isolationMode: true,
    logCollection: true,
    baseUrl: "http://localhost:5000/api",
  });

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Container className="w-5 h-5 text-[#1B4DFF]" />
        <h3 className="text-[#0B1F4D]">Environment Configuration</h3>
      </div>

      <div className="space-y-5">
        {/* Environment Type */}
        <div>
          <label htmlFor="envType" className="block text-gray-700 mb-2">
            Environment Type
          </label>
          <select
            id="envType"
            value={config.envType}
            onChange={(e) => setConfig({ ...config, envType: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent bg-white"
          >
            <option value="docker">Docker Container (Recommended)</option>
          </select>
        </div>

        {/* Database Image */}
        <div>
          <label htmlFor="dbImage" className="block text-gray-700 mb-2">
            Database Image
          </label>
          <div className="relative">
            <Database className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="dbImage"
              value={config.dbImage}
              onChange={(e) => setConfig({ ...config, dbImage: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent"
              placeholder="e.g., postgres:latest"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Specify Docker image for database container
          </p>
        </div>

        {/* Reset Policy */}
        <div>
          <label htmlFor="resetPolicy" className="block text-gray-700 mb-2">
            Reset Policy
          </label>
          <select
            id="resetPolicy"
            value={config.resetPolicy}
            onChange={(e) => setConfig({ ...config, resetPolicy: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent bg-white"
          >
            <option value="per-test">Reset after each test</option>
            <option value="per-suite">Reset once per test suite</option>
            <option value="manual">Manual reset only</option>
          </select>
        </div>

        {/* API Base URL */}
        <div>
          <label htmlFor="baseUrl" className="block text-gray-700 mb-2">
            API Base URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="baseUrl"
              value={config.baseUrl}
              onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent"
              placeholder="http://localhost:5000/api"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-2">
          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1B4DFF]/30 transition-all cursor-pointer">
            <div className="flex-1">
              <span className="text-gray-800">Run Tests in Isolation Mode</span>
              <p className="text-sm text-gray-500 mt-1">
                Recommended for accurate results
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={config.isolationMode}
                onChange={(e) => setConfig({ ...config, isolationMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1B4DFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#1B4DFF] peer-checked:to-[#00A0B0]"></div>
            </div>
          </label>

          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1B4DFF]/30 transition-all cursor-pointer">
            <div className="flex-1">
              <span className="text-gray-800">Enable real-time log collection</span>
              <p className="text-sm text-gray-500 mt-1">
                Capture execution logs for debugging
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={config.logCollection}
                onChange={(e) => setConfig({ ...config, logCollection: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1B4DFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#1B4DFF] peer-checked:to-[#00A0B0]"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
