/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { iMiddleware } from "./middleware.interface";

export default class AuthMiddleware implements iMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		// if token exist, split authorization array, and get second elemnt
		// first Berrer
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(" ")[1], this.secret, (err, payload): void => {
				if (err) {
					next();
				} else if (payload) {
					if(typeof payload !== "string") {	
						req.user = payload.email;
					}
					next();
				}
			});
		}
		next();
	}
}
