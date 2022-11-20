import { Router, Response } from "express";

import { IControllerRoute } from "./route.interface";
import LoggerService from "../logger/logger.service";


export default abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
        this._router = Router();
    }

    get router(): Router {
        return this._router;
    }

    public send<T> (res: Response, code: number, message: T): Response {
        res.type('application/json');
        return res.status(code).json(message)
    }

    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200 ,message);
    }

    public created (res: Response): Response {
        return res.status(201);
    }   

    protected bindRoutes( routes: IControllerRoute[]): void {
        for (const rout of routes) {
            this.logger.log(`${rout.method}: ${rout.path}`);
            const handler = rout.callback.bind(this);
            
            this._router[rout.method](rout.path, handler);
        }
    }
};
