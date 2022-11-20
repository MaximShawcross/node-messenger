import { Response, Request, NextFunction } from "express";

import BaseController from "../common/base.controller";
import loggerService from "../logger/logger.service";

export default class UserController extends BaseController {
    constructor(logger: loggerService) {
        super(logger);
        super.bindRoutes([
            { path: "/login", callback: this.login, method: "post" },
            { path: "/register", callback: this.register, method: "post" }
        ]);
    }

    login(req: Request, res: Response, next: NextFunction): void {
        this.ok(res, "login is successed!");
    }

    register(req: Request, res: Response, next: NextFunction): void {
        const messageWithStatus = this.created(res);

        this.ok(messageWithStatus, "register is done!")
    }   
};
