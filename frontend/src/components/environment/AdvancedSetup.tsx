import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, X, Settings } from "lucide-react";

export function AdvancedSetup() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [envVars, setEnvVars] = useState([
    { key: "DB_NAME", value: "test_db" },
    { key: "DB_USER", value: "admin" },
  ]);
  const [portMapping, setPortMapping] = useState("5432:5432");
  const [timeout, setTimeout] = useState("300");
  const [parallelExecution, setParallelExecution] = useState(false);

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const removeEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const updateEnvVar = (index: number, field: "key" | "value", value: string) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-all"
      >
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#1B4DFF]" />
          <h3 className="text-[#0B1F4D]">Advanced Setup</h3>
          <span className="text-sm text-gray-500">(Optional)</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-5 border-t border-gray-200 pt-6">
          {/* Port Mapping */}
          <div>
            <label htmlFor="portMapping" className="block text-gray-700 mb-2">
              Port Mapping
            </label>
            <input
              type="text"
              id="portMapping"
              value={portMapping}
              onChange={(e) => setPortMapping(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent"
              placeholder="e.g., 5432:5432"
            />
            <p className="text-sm text-gray-500 mt-1">
              Map container port to host port
            </p>
          </div>

          {/* Environment Variables */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-700">Environment Variables</label>
              <button
                onClick={addEnvVar}
                className="flex items-center gap-1 text-sm text-[#1B4DFF] hover:text-[#00A0B0] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Variable
              </button>
            </div>
            <div className="space-y-2">
              {envVars.map((envVar, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={envVar.key}
                    onChange={(e) => updateEnvVar(index, "key", e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent"
                    placeholder="KEY"
                  />
                  <input
                    type="text"
                    value={envVar.value}
                    onChange={(e) => updateEnvVar(index, "value", e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent"
                    placeholder="Value"
                  />
                  <button
                    onClick={() => removeEnvVar(index)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Timeout Limit */}
          <div>
            <label htmlFor="timeout" className="block text-gray-700 mb-2">
              Timeout Limit (seconds)
            </label>
            <input
              type="number"
              id="timeout"
              value={timeout}
              onChange={(e) => setTimeout(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] focus:border-transparent"
              placeholder="300"
            />
            <p className="text-sm text-gray-500 mt-1">
              Maximum execution time per test case
            </p>
          </div>

          {/* Parallel Execution */}
          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1B4DFF]/30 transition-all cursor-pointer">
            <div className="flex-1">
              <span className="text-gray-800">Enable Parallel Execution</span>
              <p className="text-sm text-gray-500 mt-1">
                Run multiple tests simultaneously
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={parallelExecution}
                onChange={(e) => setParallelExecution(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1B4DFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#1B4DFF] peer-checked:to-[#00A0B0]"></div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
