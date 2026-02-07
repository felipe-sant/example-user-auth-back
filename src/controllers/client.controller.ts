import { Request, Response } from "express";

class ClientController {

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
        // TODO
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