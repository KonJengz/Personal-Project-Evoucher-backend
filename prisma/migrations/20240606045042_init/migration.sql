-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(40) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `statusEmail` BOOLEAN NOT NULL DEFAULT true,
    `status_user` BOOLEAN NOT NULL DEFAULT true,
    `phone` VARCHAR(10) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileImage` VARCHAR(191) NOT NULL,
    `lineShoppingUrl` VARCHAR(191) NOT NULL,
    `secretKeyApi` VARCHAR(191) NOT NULL,
    `nameStore` VARCHAR(191) NOT NULL,
    `countSendVoucher` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorySendVoucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `countByMonth` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `years` YEAR NOT NULL,
    `storeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evoucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voucherId` VARCHAR(191) NULL,
    `nameVoucher` VARCHAR(191) NULL,
    `numberVoucher` VARCHAR(191) NULL,
    `detailVoucher` VARCHAR(191) NULL,
    `statusVoucher` BOOLEAN NOT NULL DEFAULT false,
    `startDate` DATE NULL,
    `endDate` DATE NULL,
    `emailEnduser` VARCHAR(191) NULL,
    `idLineUser` VARCHAR(191) NOT NULL,
    `timeSendEmail` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `timeSendLine` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,
    `storeId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branchKey` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorySendVoucher` ADD CONSTRAINT `HistorySendVoucher_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evoucher` ADD CONSTRAINT `Evoucher_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evoucher` ADD CONSTRAINT `Evoucher_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
