import { IsEmail, IsString } from "class-validator";

export default class UserRegisterDto {
	@IsEmail({}, { message: "Wrong email!" })
	email: string;

	@IsString({ message: "Password is required!" })
	password: string;

	@IsString({ message: "Name is required!" })
	name: string;
}
