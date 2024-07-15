/*
  Warnings:

  - A unique constraint covering the columns `[lineShoppingUrl]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameStore]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Store` ADD COLUMN `emailStore` VARCHAR(191) NULL,
    ADD COLUMN `phoneStore` VARCHAR(191) NULL,
    MODIFY `profileImage` VARCHAR(191) NULL,
    MODIFY `lineShoppingUrl` VARCHAR(191) NULL,
    MODIFY `secretKeyApi` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Store_lineShoppingUrl_key` ON `Store`(`lineShoppingUrl`);

-- CreateIndex
CREATE UNIQUE INDEX `Store_nameStore_key` ON `Store`(`nameStore`);
