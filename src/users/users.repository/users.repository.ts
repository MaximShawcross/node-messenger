/* eslint-disable prettier/prettier */
import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import PrismaService from "../../common/database/prisma.service";
import { TYPES } from "../../types";
import userEntity from "../user.entity";
import { IUsersRepository } from "./users.repository.interface";

@injectable()
export default class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	//      user:
	public async create({email, name, password}: userEntity): Promise<UserModel> { 
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name
			}
		})
	}

	public async find(email: string): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: { 
				email 
			}
		})
	}
};
