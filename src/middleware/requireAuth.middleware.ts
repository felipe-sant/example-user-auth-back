import { NextFunction, Request, Response } from "express";
import JWT from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: any
}

async function requireAuthMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.accessToken
    if (!token) {
        res.status(401).json({ message: "Token not found" })
        return
    }

    try {
        const payload = JWT.verifyAccessToken(token)
        req.user = payload

        next()
        return
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
        return
    }
}

export default requireAuthMiddleware