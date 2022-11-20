import express, { Express, Request, Response, Router } from "express";
import { Server } from "http";

import LoggerService from "./logger/logger.service";
import UserController from "./users/users.controller";

export default class App {
    private app: Express;
    private server: Server;
    private port: number = 8000;
    private logger: LoggerService;
    private userController: UserController;
    
    constructor(logger: LoggerService, userController: UserController) { 
        this.app = express();
        this.logger = logger;
        this.userController = userController;
    }

    useRoutes (): void {
        this.app.use("/users", this.userController.router);
    }

     // run app method
     public async init(): Promise<void> { 
        this.useRoutes();
        this.server = this.app.listen(this.port);

        this.logger.log(`server started on localhost:${this.port}`);
    }
    
};
