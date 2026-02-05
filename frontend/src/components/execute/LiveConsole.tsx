import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const initialLogs = [
  { time: "12:34:01", type: "info", message: "[INFO] Initializing test environment..." },
  { time: "12:34:02", type: "success", message: "[SUCCESS] Docker container started: postgres:latest" },
  { time: "12:34:03", type: "info", message: "[INFO] Running test: Valid login credentials" },
  { time: "12:34:04", type: "success", message: "[PASS] Test completed in 1.2s" },
  { time: "12:34:05", type: "info", message: "[INFO] Running test: Invalid email format" },
  { time: "12:34:06", type: "success", message: "[PASS] Test completed in 0.8s" },
  { time: "12:34:07", type: "info", message: "[INFO] Running test: Missing password field" },
  { time: "12:34:09", type: "error", message: "[FAIL] Expected 400, received 500" },
  { time: "12:34:09", type: "error", message: "[ERROR] AssertionError: Status code mismatch" },
  { time: "12:34:10", type: "info", message: "[INFO] Running test: SQL injection attempt" },
];

export function LiveConsole() {
  const [logs, setLogs] = useState(initialLogs);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate new logs
    const interval = setInterval(() => {
      const newLogs = [
        "[INFO] Validating security headers...",
        "[INFO] Testing edge case scenarios...",
        "[DEBUG] Request payload validated",
        "[INFO] Database transaction rolled back",
      ];

      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      setLogs((prev) => [
        ...prev,
        {
          time,
          type: "info",
          message: randomLog,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "success":
        return "text-green-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[600px]">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#00A0B0]" />
          <h3 className="text-[#0B1F4D]">Live Console</h3>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div
        ref={consoleRef}
        className="flex-1 bg-[#1e1e1e] p-4 overflow-y-auto font-mono text-sm"
      >
        {logs.map((log, index) => (
          <div key={index} className="mb-1 flex gap-3">
            <span className="text-gray-500">{log.time}</span>
            <span className={getLogColor(log.type)}>{log.message}</span>
          </div>
        ))}
        <div className="animate-pulse">
          <span className="text-gray-500">▊</span>
        </div>
      </div>
    </div>
  );
}
