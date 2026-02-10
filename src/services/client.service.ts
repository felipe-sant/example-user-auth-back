import AuthRepository from "../repositories/auth.repository";
import ClientRepository, { ClientType, ClientType_send } from "../repositories/client.repository";
import bcrypt from "bcrypt"

class ClientService {
    private clientRepository = new ClientRepository()
    private authRepository = new AuthRepository()

    async getAccount(id: number): Promise<ClientType | undefined> {
        const user = await this.clientRepository.getClient(id)
        return user
    }

    async clientExists(username: string): Promise<boolean> {
        const id = await this.clientRepository.getId(username)
        if (id)
            return true
        else
            return false
    }

    async login(client: ClientType_send, password: string): Promise<{ isLogged: boolean, id?: number }> {
        const id = await this.clientRepository.getId(client.username)
        if (!id) return { isLogged: false }

        const hashPassword = (await this.authRepository.getHashPassword(id)).hash_password
        const logged = await bcrypt.compare(password, hashPassword)

        if (logged) {
            return { isLogged: true, id: id }
        } else {
            return { isLogged: false }
        }
    }

    async registerNewClient(client: ClientType_send, password: string) {
        const newClient: ClientType = await this.clientRepository.newClient(client)

        const salt = 10
        const hashPassword = await bcrypt.hash(password, salt)

        await this.authRepository.newAuth({ user_id: newClient.id, hash_password: hashPassword })

        return newClient.id
    }
}

export default ClientService