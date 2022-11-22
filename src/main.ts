// app entry point
import { Container, ContainerModule, interfaces } from "inversify";
import App from "./app";
import ExeptionFilter from "./errors/exeption.filter";
import { IExpeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import LoggerService from "./logger/logger.service";
import { TYPES } from "./types";
import UserController from "./users/users.controller";
import { IUserController } from "./users/users.controller.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<IExpeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IUserController>(TYPES.UserController).to(UserController);
});

function bootstrap(): { appContainer: Container; app: App } {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
