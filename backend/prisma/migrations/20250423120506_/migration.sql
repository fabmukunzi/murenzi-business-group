/*
  Warnings:

  - You are about to drop the column `meters` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `sizeOfBaths` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `sizeOfBeds` on the `Room` table. All the data in the column will be lost.
  - Added the required column `size` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "meters",
DROP COLUMN "sizeOfBaths",
DROP COLUMN "sizeOfBeds",
ADD COLUMN     "size" TEXT NOT NULL;
