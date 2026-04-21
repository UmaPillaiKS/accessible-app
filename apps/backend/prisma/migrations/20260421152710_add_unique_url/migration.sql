/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `AuditTarget` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AuditTarget_url_key" ON "AuditTarget"("url");
