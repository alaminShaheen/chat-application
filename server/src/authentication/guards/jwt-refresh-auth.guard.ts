import {
	ExecutionContext,
	Injectable,
	Logger,
	UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { AppErrorMessagesService } from "../../app-messages/app-error-messages.service";

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard("jwt-refresh") {
	private readonly logger: Logger = new Logger(JwtRefreshAuthGuard.name);

	constructor(
		private readonly errorMessagesService: AppErrorMessagesService,
	) {
		super();
	}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		// Add custom auth logic here
		// this.logger.debug(super.canActivate(context), JwtRefreshAuthGuard.name)
		return super.canActivate(context);
	}

	handleRequest(err, user) {
		// You can throw an exception based on either "info" or "err" arguments
		if (err || !user) {
			this.logger.error(this.errorMessagesService.USER_UNAUTHENTICATED);
			throw (
				err ||
				new UnauthorizedException(
					this.errorMessagesService.USER_UNAUTHENTICATED,
				)
			);
		}

		// Adds user to request object
		// Here user is userId and email i.e. whatever we attached in jwt token
		// This also contains refreshToken
		return user;
	}
}
