/*
  Warnings:

  - You are about to drop the column `email` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `requesttransactionid` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionid` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[requestTransactionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `initiatorId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestTransactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_transactionId_fkey";

-- DropIndex
DROP INDEX "Transaction_requesttransactionid_key";

-- DropIndex
DROP INDEX "Transaction_transactionid_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
ALTER COLUMN "transactionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
DROP COLUMN "requesttransactionid",
DROP COLUMN "transactionid",
ADD COLUMN     "initiatorId" TEXT NOT NULL,
ADD COLUMN     "requestTransactionId" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Initiator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Initiator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "Transaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_requestTransactionId_key" ON "Transaction"("requestTransactionId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "Initiator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
