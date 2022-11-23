import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import BaseController from "../common/base.controller/base.controller";
import { ILogger } from "../logger/logger.interface";
import { IUserController } from "./users.controller.interface";

import { TYPES } from "../types";

import UserRegisterDto from "./dto/user-login.dto";
import UserLoginDto from "./dto/user-register.dto";
import User from "./user.entity";

// @injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		super(logger);
		super.bindRoutes([
			{ path: "/login", callback: this.login, method: "post" },
			{ path: "/register", callback: this.register, method: "post" }
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body); // JSON file from PUT or POST request
		this.ok(res, "login is successed!");
		// next(new HTTPError(421, "ut", "login"))
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = new User(body.email, body.name);
		await user.setPassword(body.password);

		this.ok(res, user);
	}
}
