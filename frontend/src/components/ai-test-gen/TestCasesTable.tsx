import { useState } from "react";
import { Sparkles, Edit, Trash2, Plus } from "lucide-react";

interface TestCase {
  id: number;
  name: string;
  type: "positive" | "negative" | "edge";
  description: string;
  confidence: number;
  selected: boolean;
}

const initialTestCases: TestCase[] = [
  {
    id: 1,
    name: "Valid login credentials",
    type: "positive",
    description: "Test successful login with valid email and password",
    confidence: 98,
    selected: false,
  },
  {
    id: 2,
    name: "Invalid email format",
    type: "negative",
    description: "Verify error handling for malformed email addresses",
    confidence: 95,
    selected: false,
  },
  {
    id: 3,
    name: "Missing password field",
    type: "negative",
    description: "Test API response when password is not provided",
    confidence: 92,
    selected: false,
  },
  {
    id: 4,
    name: "SQL injection attempt",
    type: "edge",
    description: "Security test for SQL injection in email field",
    confidence: 88,
    selected: false,
  },
  {
    id: 5,
    name: "Empty request body",
    type: "negative",
    description: "Test behavior with completely empty payload",
    confidence: 94,
    selected: false,
  },
  {
    id: 6,
    name: "Maximum length password",
    type: "edge",
    description: "Test with password at maximum allowed length",
    confidence: 85,
    selected: false,
  },
];

export function TestCasesTable() {
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const selectedCount = testCases.filter(tc => tc.selected).length;

  const toggleSelect = (id: number) => {
    setTestCases(prev =>
      prev.map(tc => (tc.id === id ? { ...tc, selected: !tc.selected } : tc))
    );
  };

  const toggleSelectAll = () => {
    const allSelected = testCases.every(tc => tc.selected);
    setTestCases(prev => prev.map(tc => ({ ...tc, selected: !allSelected })));
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-700";
      case "negative":
        return "bg-red-100 text-red-700";
      case "edge":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Table Header Actions */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00A0B0]" />
            <h3 className="text-[#0B1F4D]">AI-Generated Test Cases</h3>
          </div>
          
          {selectedCount > 0 && (
            <span className="px-3 py-1 bg-[#1B4DFF]/10 text-[#1B4DFF] rounded-full text-sm">
              {selectedCount} selected
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] text-white rounded-lg hover:shadow-lg hover:shadow-[#1B4DFF]/30 transition-all">
            <Sparkles className="w-4 h-4" />
            Generate More Cases
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#1B4DFF] hover:text-[#1B4DFF] transition-all">
            <Plus className="w-4 h-4" />
            Add Custom Test Case
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={testCases.every(tc => tc.selected)}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-[#1B4DFF] border-gray-300 rounded focus:ring-[#1B4DFF] cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Test Case Name</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Type</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Description</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">AI Confidence</th>
              <th className="px-6 py-3 text-center text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {testCases.map((testCase) => (
              <tr key={testCase.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={testCase.selected}
                    onChange={() => toggleSelect(testCase.id)}
                    className="w-4 h-4 text-[#1B4DFF] border-gray-300 rounded focus:ring-[#1B4DFF] cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00A0B0]" />
                    <span className="text-gray-800">{testCase.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${getTypeBadge(testCase.type)}`}>
                    {testCase.type.charAt(0).toUpperCase() + testCase.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-xs">{testCase.description}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                      <div
                        className="bg-gradient-to-r from-[#1B4DFF] to-[#00A0B0] h-2 rounded-full"
                        style={{ width: `${testCase.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-700">{testCase.confidence}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
