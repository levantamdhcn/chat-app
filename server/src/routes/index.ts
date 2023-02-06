import { Router } from "express";
import user from "./user";

class MasterRouter {
    private rout = Router();
    private userRoute = user;

    get router() {
        return this.rout;
    }

    constructor() {
        this.init();
    }

    private init() {
        this.rout.use("/user", this.userRoute);
    };
}

export = new MasterRouter().router;