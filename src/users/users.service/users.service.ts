import { injectable } from "inversify";
import userLoginDto from "../dto/user-login.dto";
import userRegisterDto from "../dto/user-register.dto";
import User from "../user.entity";
import { IUserService } from "./users.service.interface";

@injectable()
export default class UserService implements IUserService {
	private _user: User;

	get user(): User {
		return this._user;
	}

	public async createUser({ name, password, email }: userRegisterDto): Promise<User | null> {
		const user = new User(email, name);
		await user.setPassword(password);

		return user;
	}

	public validateUser({ email, password }: userLoginDto): boolean {
		return true;
	}
}
