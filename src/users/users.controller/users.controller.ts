/* eslint-disable prettier/prettier */
import e, { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { sign } from "jsonwebtoken"
import "reflect-metadata";

import BaseController from "../../common/base.controller/base.controller";

import { ILogger } from "../../logger/logger.interface";
import { IUserService } from "../users.service/users.service.interface";
import { IUserController } from "./users.controller.interface";

import { TYPES } from "../../types";

import UserRegisterDto from "../dto/user-register.dto";
import UserLoginDto from "../dto/user-login.dto";
import HTTPError from "../../errors/http-class.error";
import ValidateMiddleware from "../../common/validate.middleware";
import { IConfigService } from "../../config/config.service.interface";

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) logger: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(logger);
		super.bindRoutes([
			{
				path: "/login",
				callback: this.login,
				method: "post",
				middlewares: [new ValidateMiddleware(UserLoginDto)]
			},
			{
				path: "/register",
				callback: this.register,
				method: "post",
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			}, {
				path: "/info",
				callback: this.info,
				method: "get"
			},
		]);
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const isUserExist = await this.userService.validateUser(body);
		if (!isUserExist) {
			return next(new HTTPError(401, "Wrong email or password!"));
		}
		const token = this.configService.get("SECRET");
		const jwt = await this.signJWT(body.email, token);

		this.ok(res, { login: "login is successed!", jwt });
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

	info({ user }: Request, res: Response, next: NextFunction): void {
		this.ok(res, { email: user });
	};

	private signJWT(email: string, secret: string): Promise<string | Error> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000)
				},
				secret,
				{ algorithm: "HS256" },
				(err, token) => {
					if (err) {
						reject(err)
					}

					resolve(token as string);
				}
			)
		});
	}
}
