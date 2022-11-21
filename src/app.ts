import { Server } from "http";

import express, { Express, Request, Response, Router } from "express";
import { injectable, inject } from "inversify";
import "reflect-metadata";

import { TYPES } from "./types";
import { ILogger } from "./logger/logger.interface";

import UserController from "./users/users.controller";
import { IExpeptionFilter } from "./errors/exeption.filter.interface";

@injectable()
export default class App {
    private app: Express;
    private server: Server;
    private port: number = 8000;
    
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger, 
        @inject(TYPES.UserController) private userController: UserController, 
        @inject(TYPES.ExeptionFilter) private exeptionFilter: IExpeptionFilter
    ) { 
        this.app = express();
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
