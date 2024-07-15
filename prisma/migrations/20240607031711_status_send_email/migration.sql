/*
  Warnings:

  - You are about to drop the column `statusEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status_user` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `statusEmail`,
    DROP COLUMN `status_user`,
    ADD COLUMN `statusSendEmail` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `statusUser` BOOLEAN NOT NULL DEFAULT true;
