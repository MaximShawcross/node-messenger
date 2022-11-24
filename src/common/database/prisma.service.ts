/* eslint-disable prettier/prettier */
import { PrismaClient, UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';

@injectable()
export default class PrismaService {
	client: PrismaClient;
	
	constructor(
		@inject(TYPES.Logger)private logger: ILogger
	) {
		this.client = new PrismaClient();
	}

	public async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log("[DataBase] Prisma is connected");
		} catch (error) {
			if( error instanceof Error) {
				this.logger.error(error.message);
			}
		}
	}

	public async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
	
};
