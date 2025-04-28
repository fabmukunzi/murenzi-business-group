/*
  Warnings:

  - Changed the type of `transactionid` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionid",
ADD COLUMN     "transactionid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionid_key" ON "Transaction"("transactionid");
