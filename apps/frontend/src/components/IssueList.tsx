import { AuditIssue } from "../types/audit"

interface Props {
  issues: AuditIssue[]
}

const severityConfig = {
  critical: { label: "Critical", color: "bg-red-100 text-red-700 border-red-200" },
  warning: { label: "Warning", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  info: { label: "Info", color: "bg-blue-100 text-blue-700 border-blue-200" },
}

export default function IssueList({ issues }: Props) {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12 text-green-600 font-medium">
        No issues found — great job!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => {
        const config = severityConfig[issue.severity]
        return (
          <div key={issue.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded border ${config.color}`}>
                {config.label}
              </span>
              <span className="text-sm font-mono text-gray-500">{issue.ruleId}</span>
            </div>
            <p className="text-gray-800 font-medium">{issue.description}</p>
            <p className="text-sm text-gray-500 mt-1">Element: <code className="bg-gray-100 px-1 rounded">{issue.element}</code></p>
            <p className="text-sm text-green-700 mt-2">Fix: {issue.fixSuggestion}</p>
          </div>
        )
      })}
    </div>
  )
}
