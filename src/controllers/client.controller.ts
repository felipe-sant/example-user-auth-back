import { Request, Response } from "express";
import ClientService from "../services/client.service";

class ClientController {
    private clientService = new ClientService()

    public async getInfo(_: Request, res: Response): Promise<void> {
        // TODO
        // NEED LOGIN
    }

    public async login(req: Request, res: Response): Promise<void> {
        // TODO
    }

    public async logout(req: Request, res: Response): Promise<void> {
        // TODO
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body

            // não deixar ser tipo errado e nulo

            console.log("passou1")

            await this.clientService.registerNewClient({ username: username }, password)

            console.log("passou2")

            res.sendStatus(201)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async __test__(_: Request, res: Response): Promise<void> {
        try {
            res.sendStatus(200)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }
}

export default ClientController