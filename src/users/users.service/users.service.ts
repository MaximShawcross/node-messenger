import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IConfigService } from "../../config/config.service.interface";
import { TYPES } from "../../types";
import UserLoginDto from "../dto/user-login.dto";
import userRegisterDto from "../dto/user-register.dto";
import User from "../user.entity";
import { IUsersRepository } from "../users.repository/users.repository.interface";
import { IUserService } from "./users.service.interface";

@injectable()
export default class UserService implements IUserService {
	private _user: User;

	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private usersRepository: IUsersRepository
	) {}

	get user(): User {
		return this._user;
	}

	public async createUser({ name, password, email }: userRegisterDto): Promise<UserModel | null> {
		const user = new User(name, email);

		const salt = this.configService.get("SALT");
		await user.setPassword(password, Number(salt));

		const existedUser = await this.usersRepository.find(email);

		if (existedUser) {
			return null;
		}

		return await this.usersRepository.create(user);
	}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);

		if (!existedUser) {
			return false;
		}
		const user = new User(existedUser.email, existedUser.name, existedUser.password);

		return user.comparePassword(password);
	}
}
