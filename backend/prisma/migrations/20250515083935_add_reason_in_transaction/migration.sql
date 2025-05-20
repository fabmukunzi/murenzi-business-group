-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "reason" TEXT DEFAULT 'Booking Payment',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'incoming';
