import { Request, Response } from "express";
import ClientService from "../services/client.service";
import JWT from "../utils/jwt";
import { AuthRequest } from "../middleware/requireAuth.middleware";

class ClientController {
    private clientService = new ClientService()

    public async getInfo(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { id } = req.user

            const user = await this.clientService.getAccount(id)

            res.status(200).json(user)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body

            if (!username) {
                res.status(400).json({ message: "username é obrigatório" })
                return
            }
            if (typeof username !== "string") {
                res.status(400).json({ message: "username tem que ser do tipo string" })
                return
            }

            if (!password) {
                res.status(400).json({ message: "password é obrigatório" })
                return
            }
            if (typeof password !== "string") {
                res.status(400).json({ message: "password tem que ser do tipo string " })
                return
            }

            const clientExists = await this.clientService.clientExists(username)
            if (!clientExists) {
                res.status(403).json({ message: "credenciais invalidas" })
                return
            }

            const isLogged = await this.clientService.login({ username: username }, password)
            if (isLogged.isLogged && isLogged.id) {
                const user = await this.clientService.getAccount(isLogged.id)
                if (!user) {
                    res.status(500).json({ message: "erro ao pegar usuário" })
                    return
                }

                const payload = {
                    id: user.id.toString()
                }
                const accessToken = JWT.generateAccessToken(payload)

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })

                res.status(200).json({ message: "usuário logado com sucesso" })
                return
            } else {
                res.sendStatus(401).json({ message: "usuário não encontrado ou senha invalida" })
                return
            }
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async logout(_: Request, res: Response) {
        try {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })

            res.status(200).json({ message: "Logout successful" })
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body

            if (!username) {
                res.status(400).json({ message: "username é obrigatório" })
                return
            }
            if (typeof username !== "string") {
                res.status(400).json({ message: "username tem que ser do tipo string" })
                return
            }

            if (!password) {
                res.status(400).json({ message: "password é obrigatório" })
                return
            }
            if (typeof password !== "string") {
                res.status(400).json({ message: "password tem que ser do tipo string " })
                return
            }

            await this.clientService.registerNewClient({ username: username }, password)

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