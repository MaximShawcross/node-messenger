// app entry point
import { Container, ContainerModule, interfaces } from "inversify";
import App from "./app";
import PrismaService from "./common/database/prisma.service";
import ConfigService from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import ExeptionFilter from "./errors/exeption.filter";
import { IExpeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import LoggerService from "./logger/logger.service";
import { TYPES } from "./types";
import UserController from "./users/users.controller/users.controller";
import { IUserController } from "./users/users.controller/users.controller.interface";
import UsersRepository from "./users/users.repository/users.repository";
import { IUsersRepository } from "./users/users.repository/users.repository.interface";
import UserService from "./users/users.service/users.service";
import { IUserService } from "./users/users.service/users.service.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IExpeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UserRepository).to(UsersRepository).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): { appContainer: Container; app: App } {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);

	app.init();

	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
