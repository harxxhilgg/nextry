-- CreateTable
CREATE TABLE "CacheTest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Views" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CacheTest_pkey" PRIMARY KEY ("id")
);
