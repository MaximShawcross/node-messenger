import { Router, Response } from "express";
import "reflect-metadata";

import { IControllerRoute } from "../route.interface";
import { ILogger } from "../../logger/logger.interface";
import { injectable } from "inversify";
import { IBaseController } from "./base.controller.interface";

@injectable()
export default abstract class BaseController implements IBaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): Response {
		res.type("application/json");
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): Response {
		this.logger.log("success");
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): Response {
		return res.status(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`${route.method}: ${route.path}`);

			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.callback.bind(this);

			const pipeline = middleware ? [...middleware, handler] : handler;

			this._router[route.method](route.path, pipeline);
		}
	}
}
