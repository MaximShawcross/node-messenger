import { NextFunction, Request, Response, Router } from "express";
import { iMiddleware } from "./middleware.interface";

export interface IControllerRoute {
	path: string;
	callback: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, "patch" | "post" | "delete" | "put" | "get">;
	middlewares?: iMiddleware[];
}
