import { Router, Request, Response } from "express"
import { runAudit } from "../services/auditEngine"
import { prisma } from "../lib/prisma"
import { nanoid } from "nanoid"

const router = Router()

router.post("/", async (req: Request, res: Response) => {
  const { url, label, email, monitor } = req.body

  if (!url) {
    return res.status(400).json({ error: "url is required" })
  }

  try {
    const auditResult = await runAudit(url)

    const target = await prisma.auditTarget.upsert({
      where: { url },
      update: { label, email, monitor: monitor ?? false },
      create: { url, label, email, monitor: monitor ?? false },
    })

    const run = await prisma.auditRun.create({
      data: {
        targetId: target.id,
        durationMs: auditResult.durationMs,
        score: auditResult.score,
        criticalCount: auditResult.criticalCount,
        warningCount: auditResult.warningCount,
        passedCount: auditResult.passedCount,
        issues: {
          create: auditResult.issues.map((issue) => ({
            ruleId: issue.ruleId,
            severity: issue.severity,
            element: issue.element,
            description: issue.description,
            fixSuggestion: issue.fixSuggestion,
          })),
        },
      },
      include: { issues: true },
    })

    const report = await prisma.sharedReport.create({
      data: {
        runId: run.id,
        slug: nanoid(10),
      },
    })

    return res.json({
      runId: run.id,
      targetId: target.id,
      slug: report.slug,
      score: auditResult.score,
      criticalCount: auditResult.criticalCount,
      warningCount: auditResult.warningCount,
      passedCount: auditResult.passedCount,
      durationMs: auditResult.durationMs,
      issues: run.issues,
    })
  } catch (error) {
    console.error("Audit failed:", error)
    return res.status(500).json({ error: "Audit failed. Make sure the URL is public and reachable." })
  }
})

export default router
