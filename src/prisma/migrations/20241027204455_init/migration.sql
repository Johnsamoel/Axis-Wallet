/*
  Warnings:

  - You are about to drop the column `receiverAccountId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `senderAccountId` on the `Transaction` table. All the data in the column will be lost.
  - Made the column `accountId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_receiverAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderAccountId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "receiverAccountId",
DROP COLUMN "senderAccountId",
ALTER COLUMN "accountId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
