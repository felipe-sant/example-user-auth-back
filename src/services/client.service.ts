import AuthRepository from "../repositories/auth.repository";
import ClientRepository, { ClientType_send } from "../repositories/client.repository";

class ClientService {
    private clientRepository = new ClientRepository()
    private authRepository = new AuthRepository()

    async registerNewClient(client: ClientType_send, password: string) {
        const newClient = await this.clientRepository.newClient(client)

        const hashPassword = password // criar hash aqui

        await this.authRepository.newAuth({ user_id: newClient.id, hash_password: hashPassword })
    }
}

export default ClientService