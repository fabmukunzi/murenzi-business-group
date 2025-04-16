/*
  Warnings:

  - You are about to drop the column `numberOfBaths` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfBeds` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "numberOfBaths",
DROP COLUMN "numberOfBeds",
ADD COLUMN     "sizeOfBaths" INTEGER,
ADD COLUMN     "sizeOfBeds" INTEGER;
