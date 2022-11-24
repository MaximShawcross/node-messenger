import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import "reflect-metadata";

import { TYPES } from "../types";

import { IExpeptionFilter } from "./exeption.filter.interface";
import { ILogger } from "../logger/logger.interface";

import HTTPError from "./http-class.error";

@injectable()
export default class ExeptionFilter implements IExpeptionFilter {
	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		this.logger = logger;
	}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			console.log("httperror");
			this.logger.error(`${err.context}: Error${err.statusCode} : ${err.message}`);
			res.status(err.statusCode).send({ error: err.message });
		} else {
			this.logger.error(`default error: ${err.message}`);
			res.status(500).send({ error: err.message });
		}
	}
}
