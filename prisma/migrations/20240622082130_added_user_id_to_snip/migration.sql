/*
  Warnings:

  - You are about to drop the column `email` on the `Snip` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Snip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Snip" DROP CONSTRAINT "Snip_email_fkey";

-- DropIndex
DROP INDEX "Snip_email_key";

-- AlterTable
ALTER TABLE "Snip" DROP COLUMN "email",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Snip" ADD CONSTRAINT "Snip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
