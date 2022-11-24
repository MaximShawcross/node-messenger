import { NextFunction, Request, Response } from "express";

export interface iMiddleware {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
