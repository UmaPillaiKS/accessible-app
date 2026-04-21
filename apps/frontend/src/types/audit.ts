export interface AuditIssue {
  id: string
  ruleId: string
  severity: "critical" | "warning" | "info"
  element: string
  description: string
  fixSuggestion: string
}

export interface AuditResult {
  runId: string
  targetId: string
  slug: string
  score: number
  criticalCount: number
  warningCount: number
  passedCount: number
  durationMs: number
  issues: AuditIssue[]
}
