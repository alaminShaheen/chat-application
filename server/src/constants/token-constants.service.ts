import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenConstantsService {
	constructor (private readonly configService: ConfigService) {
	}
	
	get REFRESH_TOKEN_VALIDITY_DURATION (): number {
		// 7 days or 1 week
		return new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
	}
	
	get ACCESS_TOKEN_VALIDITY_DURATION (): number {
		// 15 mins
		return new Date().getTime() + 15 * 60 * 1000;
	}
	
	get ACCESS_TOKEN_SECRET (): string {
		return this.configService.get<string>("ACCESS_TOKEN_SECRET");
	}
	
	get REFRESH_TOKEN_SECRET (): string {
		return this.configService.get<string>("REFRESH_TOKEN_SECRET");
	}
	
	get REFRESH_TOKEN_SALT_ROUNDS (): number {
		return 10;
	}
}
