import { hash, compare } from "bcryptjs";

export default class User {
	private _password: string;
	private readonly _email: string;
	private readonly _name: string;

	// eslint-disable-next-line prettier/prettier
	constructor( name: string, email: string, passwordHash?: string ) {
		this._email = email;
		this._name = name;

		if (passwordHash) {
			this._password = passwordHash;
		}
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

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}
