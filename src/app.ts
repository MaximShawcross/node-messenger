import express, { Express, Request, Response, Router } from "express";
import { Server } from "http";

import LoggerService from "./logger/logger.service";
import UserController from "./users/users.controller";
import ExeptionFilter from "./errors/exeption.filter";

export default class App {
    private app: Express;
    private server: Server;
    private port: number = 8000;
    private logger: LoggerService;
    private userController: UserController;
    private exeptionFilter: ExeptionFilter; 
    
    constructor(logger: LoggerService, userController: UserController, exeptionFilter: ExeptionFilter) { 
        this.app = express();
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes (): void {
        this.app.use("/users", this.userController.router);
    }

    useExeptionFilter() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }
    
     // run app method
    public async init(): Promise<void> { 
        this.server = this.app.listen(this.port);

        this.useRoutes();
        this.useExeptionFilter();         

        this.logger.log(`server started on localhost:${this.port}`);
    }
    
};
