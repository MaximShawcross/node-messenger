import { inject, injectable } from "inversify";
import { IConfigService } from "../../config/config.service.interface";
import { TYPES } from "../../types";
import userLoginDto from "../dto/user-login.dto";
import userRegisterDto from "../dto/user-register.dto";
import User from "../user.entity";
import { IUserService } from "./users.service.interface";

@injectable()
export default class UserService implements IUserService {
	private _user: User;

	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	get user(): User {
		return this._user;
	}

	public async createUser({ name, password, email }: userRegisterDto): Promise<User | null> {
		const user = new User(email, name);

		const salt = this.configService.get("SALT");
		await user.setPassword(password, Number(salt));

		return user;
	}

	public validateUser({ email, password }: userLoginDto): boolean {
		return true;
	}
}
