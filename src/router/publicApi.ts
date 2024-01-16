// @ts-ignore
import express from 'express';
import {barang} from "../controller/barang";
import {transaksi} from "../controller/transaksi";
import {toko} from "../controller/toko";

const router = express.Router()

// barang api
router.get( '/barang', barang.find )
router.get( '/barang/:id', barang.findId )
router.post( '/barang', barang.create )
router.put( '/barang/:id', barang.update )
router.delete( '/barang/:id', barang.delete )
// transaksi api
router.get( '/transaksi', transaksi.find )
router.get( '/transaksi/:id', transaksi.findId )
router.post( '/transaksi', transaksi.create )
router.put( '/transaksi/:id', transaksi.update )
router.delete( '/transaksi/:id', transaksi.delete )
// toko api
router.get( '/toko', toko.find )
router.get( '/toko/:id', toko.findId )
router.post( '/toko', toko.create )
router.put( '/toko/:id', toko.update )
router.delete( '/toko/:id', toko.delete )
export default router
