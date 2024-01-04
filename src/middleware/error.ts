import {NextFunction, Request, Response} from "express"
import {Prisma} from '@prisma/client'

export const errorMiddleware = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!err) {
        next()
        return;
    }
    if (err instanceof ResponseError) {
        res.status(err.status).json({errors: err.message}).end()
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({errors: err.message}).end()
    } else {        res.status(500).json({errors: err.message}).end()
    }
}

class ResponseError extends Error {
    public status: number

    constructor(status: number, message: string) {
        super(message);
        this.status = status
    }
}