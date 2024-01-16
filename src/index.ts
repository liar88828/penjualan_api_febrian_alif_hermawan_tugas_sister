// @ts-ignore
import Express from "express";
// @ts-ignore
import cors from 'cors'
import { errorMiddleware } from "./middleware/error";
import publicApi from './router/publicApi'
const app = Express();
const port = 3000

app.use( Express.json() )
app.use( Express.urlencoded( { extended: true } ) )
app.use( cors() )
app.use( errorMiddleware )
app.use( '/api', publicApi )
app.listen( port, () => { console.log( `http://localhost:${ port }` ) } )
