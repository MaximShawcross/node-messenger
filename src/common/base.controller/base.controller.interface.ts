import { Response } from "express";

export interface IBaseController {
	send<T>(res: Response, code: number, message: T): Response;
	ok<T>(res: Response, message: T): Response;
	created(res: Response): Response;
}
