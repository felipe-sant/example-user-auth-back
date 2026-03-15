import db from "../db"

export type ClientType = {
    id: number
    username: string
    email?: string
    name?: string
}

export type ClientType_send = {
    username: string
    email?: string,
}

export type ClientType_update_info = {
    email?: string
    name?: string,
    dateofbirth?: Date
}

class ClientRepository {
    public async newClient(client: ClientType_send): Promise<ClientType> {
        const query = "INSERT INTO client (username, email) VALUES ($1, $2) RETURNING id, username, email, name"
        const newClient = (await db.query(query, [client.username, client.email])).rows[0]
        if (!newClient) throw new Error("Erro ao criar cliente")

        return newClient
    }

    public async getClient(id: number): Promise<ClientType | undefined> {
        const query = "SELECT id, username, email, name, dateofbirth FROM client WHERE id = $1"
        const res = await db.query<ClientType>(query, [id])
        return res.rows[0]
    }

    public async getId(username: string): Promise<number | undefined> {
        const query = "SELECT id FROM client WHERE username = $1"
        const res = (await db.query<{ id: number }>(query, [username]))
        if (res.rowCount && res.rowCount > 0)
            return res.rows[0].id
        else
            return undefined
    }

    public async updateClient(id: number, client: Partial<ClientType_update_info>): Promise<void> {
        const keys = Object.keys(client) as (keyof typeof client)[]
        if (keys.length === 0) return

        const sets = keys.map((key, index) => `${key} = $${index + 1}`)
        const values = keys.map(key => client[key])

        const query = `UPDATE client SET ${sets.join(", ")} WHERE id = $${keys.length + 1}`

        await db.query(query, [...values, id])
    }
}

export default ClientRepository