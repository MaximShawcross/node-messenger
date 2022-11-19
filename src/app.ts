import express, { Express, Request, Response, Router } from "express";
import { Server } from "http"
import { router as userRouter } from "./users/users";

export default class App {
    private app: Express;
    private server: Server;
    private port: number = 8000;
    
    constructor() { 
        this.app = express();
    }
    
    // run app method
    public async init(): Promise<void> { 
        this.server = this.app.listen(this.port);
        this.useRoutes("/users", userRouter);

        console.log(`server started on localhost:${this.port}`);
    }

    useRoutes (route: string, router: Router): void {
        this.app.use(route, router);
    }
    
};
