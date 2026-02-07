import db from "../db"

export type ClientType = {
    id: number
    username: string
    email?: string
    name?: string
}

export type ClientType_send = {
    username: string
    email?: string
}

class ClientRepository {
    public async newClient(client: ClientType_send): Promise<ClientType> {
        const query = "INSERT INTO client (username, email) VALUES ($1, $2) RETURNING id, username, email, name"
        const newClient = (await db.query(query, [client.username, client.email])).rows[0]
        if (!newClient) throw new Error("Erro ao criar cliente")

        return newClient
    }

    public async getClient(id: number): Promise<ClientType> {
        const query = "SELECT (id, username, email, name) FROM client WHERE id = $1"
        const res = await db.query(query, [id])
        return res.rows[0]
    }
}

export default ClientRepository