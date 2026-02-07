import db from "../db"

export type AuthType = {
    hash_password: string
}

export type AuthType_send = {
    user_id: number
    hash_password: string
}

class AuthRepository {
    public async newAuth(auth: AuthType_send): Promise<void> {
        const query = "INSERT INTO auth (user_id, hash_password) VALUES ($1, $2)"
        await db.query(query, [auth.user_id, auth.hash_password])
    }

    public async getHashPassword(id: number): Promise<AuthType> {
        const query = "SELECT (hash_password) FROM auth WHERE user_id = $1"
        const res = await db.query(query, [id])
        if (res.rowCount !== 1) throw new Error("Cliente não possui uma senha registrada")
        return res.rows[0]
    }
}

export default AuthRepository