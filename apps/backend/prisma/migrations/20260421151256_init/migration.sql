-- CreateTable
CREATE TABLE "AuditTarget" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT,
    "email" TEXT,
    "monitor" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditRun" (
    "id" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "ranAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMs" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "criticalCount" INTEGER NOT NULL,
    "warningCount" INTEGER NOT NULL,
    "passedCount" INTEGER NOT NULL,

    CONSTRAINT "AuditRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditIssue" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fixSuggestion" TEXT NOT NULL,

    CONSTRAINT "AuditIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedReport" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedReport_runId_key" ON "SharedReport"("runId");

-- CreateIndex
CREATE UNIQUE INDEX "SharedReport_slug_key" ON "SharedReport"("slug");

-- AddForeignKey
ALTER TABLE "AuditRun" ADD CONSTRAINT "AuditRun_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "AuditTarget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditIssue" ADD CONSTRAINT "AuditIssue_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AuditRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedReport" ADD CONSTRAINT "SharedReport_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AuditRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
