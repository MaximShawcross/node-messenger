import { ClassConstructor, plainToInstance } from "class-transformer";
import e, { Request, Response, NextFunction } from "express";
import HTTPError from "../errors/http-class.error";
import UserLoginDto from "../users/dto/user-login.dto";
import { IMiddleware } from "./middleware.interface";

export default class GuardMiddleware implements IMiddleware {
	execute(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}

		res.status(401).send({ error: "User is not authorized" });
	}
}
