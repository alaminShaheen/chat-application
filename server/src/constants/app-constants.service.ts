import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConstantsService {
	constructor (private readonly configService: ConfigService) {
	}
	
	get CLIENT_URL (): string {
		return this.configService.get<string>("CLIENT_URL");
	}
	
	get CLIENT_DOMAIN (): string {
		return this.configService.get<string>("CLIENT_DOMAIN");
	}
}
