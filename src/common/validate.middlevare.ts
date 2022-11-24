import { Request, Response, NextFunction } from "express";
import { iMiddleware } from "./middleware.interface";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export default class ValidateMiddleware implements iMiddleware {
	private classToValidate: ClassConstructor<object>;

	constructor(classToValidate: ClassConstructor<object>) {
		this.classToValidate = classToValidate;
	}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToInstance(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
