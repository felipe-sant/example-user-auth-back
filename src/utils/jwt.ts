import * as jwt from "jsonwebtoken";

const ACCESS_SECRET: jwt.Secret = process.env.JWT_ACCESS_SECRET || "fallback_access_secret";

class JWT {
    static generateAccessToken(payload: jwt.JwtPayload | string | Buffer): string {
        const options: jwt.SignOptions = { expiresIn: "1d" };
        return jwt.sign(payload as jwt.JwtPayload, ACCESS_SECRET, options);
    }
    
    static verifyAccessToken(token: string): jwt.JwtPayload {
        return jwt.verify(token, ACCESS_SECRET) as jwt.JwtPayload;
    }
}

export default JWT