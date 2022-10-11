/*
  Warnings:

  - You are about to drop the column `totalPost` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `totalPost`,
    ADD COLUMN `totalPosts` INTEGER NOT NULL DEFAULT 0;
