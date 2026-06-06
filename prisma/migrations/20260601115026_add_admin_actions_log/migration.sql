-- CreateEnum
CREATE TYPE "AdminActionType" AS ENUM ('WARN', 'FINAL_WARN', 'RESET_WARNINGS', 'TEMP_BAN', 'PERM_BAN', 'UNBAN');

-- CreateTable
CREATE TABLE "AdminActionsLog" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "targetUserId" TEXT,
    "action" "AdminActionType" NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminActionsLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminActionsLog_adminUserId_idx" ON "AdminActionsLog"("adminUserId");

-- CreateIndex
CREATE INDEX "AdminActionsLog_targetUserId_idx" ON "AdminActionsLog"("targetUserId");

-- CreateIndex
CREATE INDEX "AdminActionsLog_createdAt_idx" ON "AdminActionsLog"("createdAt");
