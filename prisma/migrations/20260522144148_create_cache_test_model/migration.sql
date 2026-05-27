/*
  Warnings:

  - You are about to drop the column `Views` on the `CacheTest` table. All the data in the column will be lost.
  - Added the required column `views` to the `CacheTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CacheTest" DROP COLUMN "Views",
ADD COLUMN     "views" INTEGER NOT NULL;
