/*
  Warnings:

  - You are about to drop the column `images` on the `menuItem` table. All the data in the column will be lost.
  - Added the required column `image` to the `menuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menuItem" DROP COLUMN "images",
ADD COLUMN     "image" TEXT NOT NULL;
