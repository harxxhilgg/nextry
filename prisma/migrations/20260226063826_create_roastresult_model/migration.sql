-- CreateEnum
CREATE TYPE "RoastIntensity" AS ENUM ('mild', 'medium', 'savage');

-- CreateTable
CREATE TABLE "RoastResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "intensity" "RoastIntensity" NOT NULL,
    "result" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoastResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoastResult_userId_idx" ON "RoastResult"("userId");

-- CreateIndex
CREATE INDEX "RoastResult_createdAt_idx" ON "RoastResult"("createdAt");
