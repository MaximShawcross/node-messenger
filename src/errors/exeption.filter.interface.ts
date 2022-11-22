import { NextFunction, Request, Response } from "express";
import LoggerService from "../logger/logger.service";
import HTTPError from "./http-class.error";

export interface IExpeptionFilter {
	catch: (err: HTTPError, req: Request, res: Response, next: NextFunction) => void;
}
