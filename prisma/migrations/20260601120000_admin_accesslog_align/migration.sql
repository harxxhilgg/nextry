-- Align AdminAccessLog and AccessStatus with the current database schema
CREATE TYPE "AccessStatus" AS ENUM ('GRANTED', 'DENIED_ROLE', 'DENIED_UNAUTH');

ALTER TABLE "AdminAccessLog"
DROP COLUMN "isAuthenticated",
DROP COLUMN "role",
DROP COLUMN "route",
ADD COLUMN "status" "AccessStatus" NOT NULL;

CREATE INDEX "AdminAccessLog_createdAt_idx" ON "AdminAccessLog"("createdAt");
