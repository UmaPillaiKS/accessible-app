import { chromium } from "playwright"
import AxeBuilder from "@axe-core/playwright"

export interface AuditIssue {
  ruleId: string
  severity: "critical" | "warning" | "info"
  element: string
  description: string
  fixSuggestion: string
}

export interface AuditResult {
  issues: AuditIssue[]
  score: number
  criticalCount: number
  warningCount: number
  passedCount: number
  durationMs: number
}

function mapImpactToSeverity(impact: string | null): "critical" | "warning" | "info" {
  if (impact === "critical" || impact === "serious") return "critical"
  if (impact === "moderate") return "warning"
  return "info"
}

function calculateScore(critical: number, warnings: number, info: number): number {
  let score = 100
  score -= Math.min(critical * 10, 60)
  score -= Math.min(warnings * 3, 30)
  score -= Math.min(info * 0.5, 10)
  return Math.max(0, Math.round(score))
}

export async function runAudit(url: string): Promise<AuditResult> {
  const startTime = Date.now()
  const browser = await chromium.launch({ headless: true })

  try {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })

    const results = await new AxeBuilder({ page }).analyze()

    const issues: AuditIssue[] = results.violations.flatMap((violation) =>
      violation.nodes.map((node) => ({
        ruleId: violation.id,
        severity: mapImpactToSeverity(violation.impact ?? null),
        element: node.target.join(", "),
        description: violation.description,
        fixSuggestion: violation.help,
      }))
    )

    const criticalCount = issues.filter((i) => i.severity === "critical").length
    const warningCount = issues.filter((i) => i.severity === "warning").length
    const infoCount = issues.filter((i) => i.severity === "info").length
    const passedCount = results.passes.length
    const score = calculateScore(criticalCount, warningCount, infoCount)
    const durationMs = Date.now() - startTime

    return {
      issues,
      score,
      criticalCount,
      warningCount,
      passedCount,
      durationMs,
    }
  } finally {
    await browser.close()
  }
}
