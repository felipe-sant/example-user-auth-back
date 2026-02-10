import { Router } from "express";
import ClientController from "../controllers/client.controller";
import requireAuthMiddleware from "../middleware/requireAuth.middleware";

class ClientRoutes {
    private clientController = new ClientController()
    private router: Router = Router()

    private url: string = ""

    constructor() {
        this.router.get(
            this.url,
            requireAuthMiddleware,
            this.clientController.getInfo.bind(this.clientController)
        )

        this.router.post(
            this.url + "/login",
            this.clientController.login.bind(this.clientController)
        )

        this.router.post(
            this.url + "/logout",
            requireAuthMiddleware,
            this.clientController.logout.bind(this.clientController)
        )

        this.router.post(
            this.url + "/register",
            this.clientController.register.bind(this.clientController)
        )

        this.router.propfind(
            this.url,
            this.clientController.__test__.bind(this.clientController)
        )
    }

    public getRouter() {
        return this.router
    }
}

const clientRoutes = new ClientRoutes().getRouter()
export default clientRoutes