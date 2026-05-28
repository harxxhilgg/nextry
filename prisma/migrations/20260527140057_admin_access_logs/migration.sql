-- CreateTable
CREATE TABLE "AdminAccessLog" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "userId" TEXT,
    "role" TEXT,
    "route" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "isAuthenticated" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAccessLog_pkey" PRIMARY KEY ("id")
);
