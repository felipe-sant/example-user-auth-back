import express, { Request, Response } from 'express'
import cors from 'cors'
import requestLoggerMiddleware from './middleware/requestLogger.middleware'
import clientRoutes from './routes/client.routes'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(requestLoggerMiddleware)

app.use("/api/user", clientRoutes)
app.use("/", (_: Request, res: Response) => res.sendStatus(404))

export default app