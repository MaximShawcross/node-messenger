import { IsEmail, IsString } from "class-validator";

export default class UserLoginDto {
	@IsEmail({}, { message: "Wrong email!" })
	email: string;

	@IsString({ message: "Password is required!" })
	password: string;
}
