/*
  Warnings:

  - Added the required column `receiverAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_accountId_fkey";

-- DropIndex
DROP INDEX "Transaction_accountId_idx";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "receiverAccountId" TEXT NOT NULL,
ADD COLUMN     "senderAccountId" TEXT NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverAccountId_fkey" FOREIGN KEY ("receiverAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderAccountId_fkey" FOREIGN KEY ("senderAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
