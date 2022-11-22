import { NextFunction, Request, Response } from "express";
import { IBaseController } from "../common/base.controller/base.controller.interface";

export interface IUserController extends IBaseController {
    login(req: Request, res: Response, next: NextFunction): void ;
    register(req: Request, res: Response, next: NextFunction): void;
}