import { NextFunction, Request, Response } from "express";
import { IExpeptionFilter } from "./exeption.filter.interface";

import HTTPError from "./http-class.error";
import LoggerService from "../logger/logger.service";

export default class ExeptionFilter implements IExpeptionFilter {
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
        // this.catch.bind(this);
    }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            console.log("httperror")
            this.logger.error(`${err.context}: Error${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({ error: err.message });
        } else {
            this.logger.error(`default error: ${err.message}`)
            res.status(500).send({error: err.message })
        }
    }

};
