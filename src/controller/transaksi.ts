import {NextFunction, Request, Response} from 'express'
import prisma from '../lib/prisma'

export class TransaksiController {
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await prisma.transaksi.findMany()
      return res.status(200).json({data: data, msg: 'success find Transaksi'})
    } catch (e) {next(e)}
  }

  async findId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = await prisma.transaksi.findUnique({
        where: {id_transaksi: Number(id)}
      })
      return res.status(200).json({data: data, msg: 'success find id Transaksi'})
    } catch (e) {next(e)}
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const json = req.body
      const data = await prisma.transaksi.create(
        {data: {
            nama_pembeli: json.nama_pembeli,
            alamat_pembeli: json.alamat_pembeli,
            no_hp_pembeli: json.no_hp_pembeli,
            total_bayar: Number(json.total_bayar),
            tgl_bayar: new Date(json.tgl_bayar + "T00:00:00.000Z"),
          }})
      return res.status(200).json({data: data, msg: 'success create Transaksi'})
    } catch (e) {next(e)}
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const json = req.body
      const id = req.params.id
      const data = await prisma.transaksi.update({
        where: {id_transaksi: Number(id)},
        data: {
          nama_pembeli: json.nama_pembeli,
          alamat_pembeli: json.alamat_pembeli,
          no_hp_pembeli: json.no_hp_pembeli,
          total_bayar: Number(json.total_bayar),
          tgl_bayar: new Date(json.tgl_bayar + "T00:00:00.000Z"),
        }
      })
      return res.status(200).json({data: data, msg: 'success update id Transaksi'})
    } catch (e) {next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = await prisma.transaksi.delete({
        where: {id_transaksi: Number(id)}
      })
      return res.status(200).json({data: data, msg: 'success delete Transaksi'})
    } catch (e) {next(e)}
  }
}

export const transaksi = new TransaksiController()
