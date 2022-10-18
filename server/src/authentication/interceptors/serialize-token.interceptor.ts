import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Response } from "express";
import { map, Observable } from "rxjs";
import { AppConstantsService } from "../../constants/app-constants.service";
import { TokenConstantsService } from "../../constants/token-constants.service";
import { RegisterUserRequestDto } from "../dtos/register-user.request.dto";
import { RegisterUserResponseDto } from "../dtos/register-user.response.dto";

// custom decorator to shorten serialize syntax
export function SerializeToken (
	appConstantsService: AppConstantsService,
	tokenConstantsService: TokenConstantsService
) {
	return UseInterceptors(new SerializeInterceptor(appConstantsService, tokenConstantsService));
}

class SerializeInterceptor implements NestInterceptor {
	constructor (
		private readonly appConstantsService: AppConstantsService,
		private readonly tokenConstantsService: TokenConstantsService
	) {
	}
	
	intercept (context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		// run something before request is handled
		const response = context.switchToHttp().getResponse<Response>();
		return next.handle().pipe(
			map((data: any) => {
				// run something before sending response
				
				if (data instanceof RegisterUserResponseDto) {
					response.cookie('refreshToken', data.tokens.refreshToken, {
						expires: new Date(this.tokenConstantsService.REFRESH_TOKEN_VALIDITY_DURATION),
						domain: this.appConstantsService.CLIENT_DOMAIN,
						sameSite: 'strict',
						httpOnly: true
					});
				}
				
				// converts data instance into RegisterUserRequestDto instance
				return plainToInstance(RegisterUserRequestDto, data, {
					excludeExtraneousValues: true,
				});
			})
		);
	}
	
}
