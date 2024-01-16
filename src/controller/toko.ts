import {NextFunction, Request, Response} from 'express'
import prisma from '../lib/prisma'

export class TokoController {

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await prisma.toko.findMany()
      return res.status(200).json({data: data, msg: 'success find toko'})
    } catch (e) {next(e)}
  }

  async findId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = await prisma.toko.findUnique(
        {where: {id_toko: Number(id)}})
      return res.status(200).json({data: data, msg: 'success find toko',})
    } catch (e) {next(e)}
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const json = req.body
      const data = await prisma.toko.create({
        data: {
          nama_toko: json.nama_toko,
          tahun: Number(json.tahun)
        }
      })
      return res.status(200).json({data: data, msg: 'success create toko'})
    } catch (e) {next(e)}
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const json = req.body
      const id = req.params.id
      const data = await prisma.toko.update({
        where: {id_toko: Number(id)},
        data: {
          nama_toko: json.nama_toko,
          tahun: Number(json.tahun)
        }
      })
      return res.json({data: data, msg: 'success update id toko ', status: 201})
    } catch (e) {next(e)}
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = await prisma.toko.deleteMany({
        where: {id_toko: Number(id)}
      })
      return res.status(200).json({data: data, msg: 'success delete id toko',})
    } catch (e) {next(e)}
  }
}

export const toko = new TokoController()
