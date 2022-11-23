import { hash } from "bcryptjs";

export default class User {
	private _password: string;
	private readonly _email: string;
	private readonly _name: string;

	constructor(email: string, password: string) {
		this._email = email;
		this._name = password;
	}

	public get email(): string {
		return this._email;
	}

	public get name(): string {
		return this._name;
	}

	public get password(): string {
		return this._password;
	}

	public async setPassword(pass: string): Promise<void> {
		this._password = await hash(pass, 10);
	}
}
