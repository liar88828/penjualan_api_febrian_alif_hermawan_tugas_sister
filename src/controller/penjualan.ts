import {Request, Response,NextFunction} from 'express'
import prisma from '../lib/prisma'

export class PenjualanController {
    async find(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await prisma.transaksi.findMany({
                include: {Pembayaran: true, Pembeli: true, Barang: true}
            })

            return res.status(200).json({data: data, msg: 'success find penjualan'})
        } catch (e) {next(e)}}

    async findId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await prisma.transaksi.findUnique({
                where: {id_transaksi: Number(id),},
                include: {Pembayaran: true, Pembeli: true, Barang: true}
            })
            return res.status(200).json({data: data, msg: 'success find id penjualan'})
        } catch (e) {next(e)}}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const json = req.body
            const data = await prisma.transaksi.create(
                {
                    include: {Pembeli: true, Pembayaran: true, Barang: true},
                    data: {
                        tgl_transaksi: new Date(json.tgl_transaksi),
                        keterangan: json.keterangan,
                        Barang: {
                            connect: {id_barang: json.id_barang}
                        },

                        Pembayaran: {create: {
                                tgl_bayar: new Date(json.tgl_bayar),
                                total_bayar: Number(json.total_bayar),
                            }},

                        Pembeli: {create: {
                                nama_pembeli: json.nama_pembeli,
                                alamat: json.alamat,
                                no_hp: json.no_hp,
                            }}
                    }})
            return res.status(200).json({data: data, msg: 'success create penjualan'})
        } catch (e) {next(e)}
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const json = req.body
            const id = req.params.id

            const data = await prisma.transaksi.update({
                where: {id_transaksi: Number(id)},

                include: {Pembeli: true, Pembayaran: true, Barang: true},

                data: {
                    tgl_transaksi: new Date(json.tgl_transaksi),
                    keterangan: json.keterangan,
                    Barang: {connect: {id_barang: json.id_barang}},

                    Pembayaran: {create: {
                            tgl_bayar: new Date(json.tgl_bayar),
                            total_bayar: Number(json.total_bayar),
                        }},

                    Pembeli: {create: {
                            nama_pembeli: json.nama_pembeli,
                            alamat: json.alamat,
                            no_hp: json.no_hp,
                        }}
                }})
            return res.status(200).json({data: data, msg: 'success update id penjualan'})
        } catch (e) {next(e)}
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id

            const data = await prisma.$transaction(async (tx) => {
                const transaksi = await tx.transaksi.deleteMany({
                    where: {id_transaksi: Number(id)}
                })

                const pembeli = await tx.pembeli.deleteMany({
                    where: {id_transaksi: {every: {id_transaksi: Number(id)}}}
                })
                const pembayaran = await tx.pembayaran.deleteMany({
                    where: {id_transaksi: {every: {id_transaksi: Number(id)}}}
                })
                return {transaksi, pembayaran, pembeli}
            })

            return res.status(200).json({data: data, msg: 'success delete penjualan'})
        } catch (e) {next(e)}}
}

export const penjualan = new PenjualanController()