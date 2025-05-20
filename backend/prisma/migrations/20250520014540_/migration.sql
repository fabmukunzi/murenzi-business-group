/*
  Warnings:

  - You are about to drop the column `initiatorId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `requestTransactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Initiator` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[transactionid]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[requesttransactionid]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `transactionId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesttransactionid` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionid` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_initiatorId_fkey";

-- DropIndex
DROP INDEX "Transaction_requestTransactionId_key";

-- DropIndex
DROP INDEX "Transaction_transactionId_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "transactionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "initiatorId",
DROP COLUMN "requestTransactionId",
DROP COLUMN "transactionId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "requesttransactionid" TEXT NOT NULL,
ADD COLUMN     "transactionid" TEXT NOT NULL;

-- DropTable
DROP TABLE "Initiator";

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionid_key" ON "Transaction"("transactionid");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_requesttransactionid_key" ON "Transaction"("requesttransactionid");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
