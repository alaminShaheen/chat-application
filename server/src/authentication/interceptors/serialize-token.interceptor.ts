import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from "@nestjs/common";
import { Tokens } from "authentication/dtos/tokens.dto";
import { Response } from "express";
import { map, Observable } from "rxjs";
import { AppConstantsService } from "../../constants/app-constants.service";
import { TokenConstantsService } from "../../constants/token-constants.service";

@Injectable()
export class SerializeTokenInterceptor implements NestInterceptor {
	constructor(
		private readonly appConstantsService: AppConstantsService,
		private readonly tokenConstantsService: TokenConstantsService,
	) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		// run something before request is handled
		const response = context.switchToHttp().getResponse<Response>();
		return next.handle().pipe(
			map((data: any) => {
				// run something before sending response

				if (data.tokens && data.tokens instanceof Tokens) {
					Logger.log(
						"attaching refresh token",
						SerializeTokenInterceptor.name,
					);
					response.cookie("refreshToken", data.tokens.refreshToken, {
						expires: new Date(
							this.tokenConstantsService.REFRESH_TOKEN_VALIDITY_DURATION,
						),
						sameSite: "none",
						httpOnly: true,
						secure: true,
					});
				}

				return data;
			}),
		);
	}
}
