-- CreateTable Barang
CREATE TABLE `Barang` (
    `id_barang` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_barang` VARCHAR(191) NOT NULL,
    `merek` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `transaksiId_transaksi` INTEGER NULL,

    UNIQUE INDEX `Barang_nama_barang_key`(`nama_barang`),
    PRIMARY KEY (`id_barang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable Transaksi
CREATE TABLE `Transaksi` (
    `id_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pembeli` VARCHAR(191) NOT NULL,
    `alamat_pembeli` TEXT NOT NULL,
    `no_hp_pembeli` VARCHAR(191) NOT NULL,
    `total_bayar` INTEGER NOT NULL,
    `tgl_bayar` DATETIME(3) NOT NULL,
    `tokoId_toko` INTEGER NULL,

    PRIMARY KEY (`id_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable Toko
CREATE TABLE `Toko` (
    `id_toko` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_toko` VARCHAR(191) NOT NULL,
    `tahun` INTEGER NOT NULL,

    PRIMARY KEY (`id_toko`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey Barang
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_transaksiId_transaksi_fkey`
FOREIGN KEY (`transaksiId_transaksi`)
REFERENCES `Transaksi`(`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey Transaksi
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_tokoId_toko_fkey`
FOREIGN KEY (`tokoId_toko`)
REFERENCES `Toko`(`id_toko`) ON DELETE SET NULL ON UPDATE CASCADE;
