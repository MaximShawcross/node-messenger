// app entry point 
import { Container } from "inversify";
import App from "./app";
import ExeptionFilter from "./errors/exeption.filter";
import { IExpeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import LoggerService from "./logger/logger.service";
import { TYPES } from "./types";
import UserController from "./users/users.controller";


const appContainer = new Container();

appContainer.bind<App>(TYPES.Application).to(App);
appContainer.bind<IExpeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);

const app = appContainer.get<App>(TYPES.Application);

app.init();

export {app, appContainer};