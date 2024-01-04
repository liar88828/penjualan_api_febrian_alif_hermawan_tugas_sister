import { produk } from '../controller/produk';
import { penjualan } from '../controller/penjualan';
import express from 'express';

const router = express.Router()

// produk api
router.get( '/produk', produk.find )
router.get( '/produk/:id', produk.findId )
router.post( '/produk', produk.create )
router.put( '/produk/:id', produk.update )
router.delete( '/produk/:id', produk.delete )
// penjualan api
router.get( '/penjualan', penjualan.find )
router.get( '/penjualan/:id', penjualan.findId )
router.post( '/penjualan', penjualan.create )
router.put( '/penjualan/:id', penjualan.update )
router.delete( '/penjualan/:id', penjualan.delete )

export default router 