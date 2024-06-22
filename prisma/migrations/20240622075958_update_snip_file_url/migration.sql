/*
  Warnings:

  - You are about to drop the column `files` on the `Snip` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Snip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Snip" DROP COLUMN "files",
DROP COLUMN "updatedAt",
ADD COLUMN     "snipUrls" TEXT[];
