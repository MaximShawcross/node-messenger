import { Response, Request, NextFunction } from "express";

import BaseController from "../common/base.controller";
import HTTPError from "../errors/http-class.error";
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
        // next(new HTTPError(421, "ut", "login"))
    }

    register(req: Request, res: Response, next: NextFunction): void {
        const messageWithStatus = this.created(res);

        this.ok(messageWithStatus, "register is done!")
    }   
};
