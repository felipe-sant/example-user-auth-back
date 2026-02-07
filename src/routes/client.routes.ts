import { Router } from "express";
import ClientController from "../controllers/client.controller";

class ClientRoutes {
    private clientController = new ClientController()
    private router: Router = Router()

    private url: string = "/"

    constructor() {
        this.router.get(
            this.url,
            // need middleware logged
            this.clientController.getInfo.bind(this.clientController)
        )

        this.router.post(
            this.url + "/login",
            this.clientController.login.bind(this.clientController)
        )

        this.router.post(
            this.url + "/logout",
            // need middleware logged
            this.clientController.logout.bind(this.clientController)
        )

        this.router.post(
            this.url + "/register",
            this.clientController.login.bind(this.clientController)
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