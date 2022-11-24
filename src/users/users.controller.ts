import e, { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import BaseController from "../common/base.controller/base.controller";

import { ILogger } from "../logger/logger.interface";
import { IUserService } from "./users.service/users.service.interface";
import { IUserController } from "./users.controller.interface";

import { TYPES } from "../types";

import UserRegisterDto from "./dto/user-register.dto";
import UserLoginDto from "./dto/user-login.dto";
import HTTPError from "../errors/http-class.error";
import ValidateMiddleware from "../common/validate.middlevare";

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) logger: ILogger,
		@inject(TYPES.UserService) private userService: IUserService
	) {
		super(logger);
		super.bindRoutes([
			{ path: "/login", callback: this.login, method: "post" },
			{
				path: "/register",
				callback: this.register,
				method: "post",
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			}
		]);
	}

	login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(body); // JSON file from PUT or POST request
		this.ok(res, "login is successed!");
		// next(new HTTPError(421, "ut", "login"))
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = await this.userService.createUser(body);

		if (!user) {
			return next(new HTTPError(422, "User alredy exist!"));
		}

		this.ok(res, { user: user.email });
	}
}
