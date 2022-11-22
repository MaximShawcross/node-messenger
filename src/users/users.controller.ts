import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import BaseController from "../common/base.controller/base.controller";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { IUserController } from "./users.controller.interface";

@injectable()
export default class UserController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        super(logger)
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
