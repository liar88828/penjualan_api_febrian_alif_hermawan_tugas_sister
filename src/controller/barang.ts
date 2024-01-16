import {NextFunction, Request, Response} from 'express'
import prisma from '../lib/prisma'

export class BarangController {
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await prisma.barang.findMany()
      return res.status(200).json({data: data, msg: 'success cari Barang'})
    } catch (e) {next(e)}
  }

  async findId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = await prisma.barang.findUnique({
        where: {id_barang: Number(id)}
      })
      return res.status(200).json({data: data, msg: 'success find id Barang'})
    } catch (e) {next(e)}
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const json = req.body
      const data = await prisma.barang.create(
        {data: {harga: json.harga, nama_barang: json.nama_barang, merek: json.merek}})
      return res.status(200).json({data: data, msg: 'success create Barang'})
    } catch (e) { next(e)}
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const json = req.body
      const id = req.params.id

      const data = await prisma.barang.update({
        where: {id_barang: Number(id)},
        data: {harga: json.harga, nama_barang: json.nama_barang, merek: json.merek}})
      return res.status(200).json({data: data, msg: 'success update id Barang'})
    } catch (e) {next(e)}
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const data = await prisma.barang.delete(
        {where:{id_barang:Number(id)}})
      return res.status(200).json({data: data, msg: 'success delete Barang'})
    } catch (e) {next(e)}
  }
}
export const barang = new BarangController()
