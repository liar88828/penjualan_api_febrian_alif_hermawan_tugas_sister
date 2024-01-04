import {Request, Response, NextFunction} from 'express'
import prisma from '../lib/prisma'

export class ProdukController {

    async find(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await prisma.supplier.findMany({include: {id_barang: true}})

            return res.status(200).json({
                data: data, msg: 'success find produk',
            })
        } catch (e) {next(e)}
    }

    async findId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await prisma.supplier.findUnique(
                {
                    where: {id_supplier: Number(id)},
                    include: {id_barang: true}
                })

            return res.status(200).json({data: data, msg: 'success find produk',})
        } catch (e) {next(e)}
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const json = req.body
            const data = await prisma.supplier.create(
                {
                    include: {id_barang: true},
                    data: {
                        nama_supplier: json.nama_supplier, alamat: json.alamat, no_telp: json.no_telp,

                        id_barang: {
                            create: {nama_barang: json.nama_barang, harga: json.harga, stok: json.stok}
                        }}
                }
            )
            return res.status(200).json({data: data, msg: 'success create produk'})
        } catch (e) {next(e)}
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const json = req.body
            const id = req.params.id

            const data = await prisma.supplier.update({
                where: {id_supplier: Number(id)},
                include: {id_barang: true},
                data: {
                nama_supplier: json.nama_supplier, alamat: json.alamat, no_telp: json.no_telp,
                id_barang: {
                        create: {nama_barang: json.nama_barang, harga: json.harga, stok: json.stok}
                    }}
            })
            return res.json({data: data, msg: 'success update id produk ', status: 201})
        } catch (e) {next(e)}
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await prisma.$transaction(async (tx) => {
                const barang = await tx.barang.deleteMany({
                    where: {id_supplier: Number(id)}
                })

                const supplier = await tx.supplier.delete({
                    where: {id_supplier: Number(id)}
                })
                return {supplier, barang}
            })
            return res.status(200).json({data: data, msg: 'success delete id produk',})
        } catch (e) {next(e)}
    }
}

export const produk = new ProdukController()