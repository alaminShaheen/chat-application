import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Logger,
	Post,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { LoginUserResponseDto } from "authentication/dtos/login-user.response.dto";
import { RegisterUserResponseDto } from "authentication/dtos/register-user.response.dto";
import { SerializeTokenInterceptor } from "authentication/interceptors/serialize-token.interceptor";
import { SerializeInterceptor } from "common/interceptors/serialize.interceptor";
import { Response } from "express";
import { DocumentationMessagesService } from "../app-messages/documentation-messages.service";
import { CurrentUserInterceptor } from "../common/interceptors/current-user.interceptor";
// import { SerializeTo } from "../common/interceptors/serialize.interceptor";
import { Express } from "../index";
import { UserResponseDto } from "../users/dtos/user-response.dto";
import { AuthenticationService } from "./authentication.service";
import { PublicRoute } from "./decorators/public-route.decorator";
import { LoginUserRequestDto } from "./dtos/login-user.request.dto";
import { RegisterUserRequestDto } from "./dtos/register-user.request.dto";
import { Tokens } from "./dtos/tokens.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh-auth.guard";
import Request = Express.Request;

@Controller("authentication")
@UseGuards(JwtAuthGuard)
@ApiTags("AuthenticationService")
@ApiInternalServerErrorResponse({
	description: DocumentationMessagesService.SERVER_ERROR,
})
export class AuthenticationController {
	private readonly logger = new Logger(AuthenticationController.name);

	constructor(
		private readonly authenticationService: AuthenticationService,
	) {}

	@Post("register")
	@PublicRoute()
	@UseInterceptors(
		new SerializeInterceptor(UserResponseDto),
		SerializeTokenInterceptor,
	)
	@HttpCode(HttpStatus.CREATED)
	@ApiBody({ type: RegisterUserRequestDto, required: true })
	@ApiCreatedResponse({
		description: DocumentationMessagesService.SUCCESSFUL_REGISTER,
		type: Tokens,
	})
	@ApiBadRequestResponse({
		description: DocumentationMessagesService.INVALID_REGISTER,
	})
	async registerLocal(
		@Body() body: RegisterUserRequestDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<RegisterUserResponseDto> {
		this.logger.log("Registering user");
		return await this.authenticationService.registerLocal(
			body.username,
			body.password,
		);

		// response.cookie("refreshToken", tokens.refreshToken, {
		// 	expires: new Date(
		// 		this.tokenConstantsService.REFRESH_TOKEN_VALIDITY_DURATION,
		// 	),
		// 	domain: this.appConstantsService.CLIENT_DOMAIN,
		// 	sameSite: "strict",
		// 	httpOnly: true,
		// });
		// console.log(user);
	}

	@Post("login")
	@PublicRoute()
	@UseInterceptors(
		new SerializeInterceptor(LoginUserResponseDto),
		SerializeTokenInterceptor,
	)
	@HttpCode(HttpStatus.OK)
	@ApiBody({ type: LoginUserRequestDto, required: true })
	@ApiOkResponse({
		description: DocumentationMessagesService.SUCCESSFUL_LOGIN,
		type: Tokens,
	})
	@ApiBadRequestResponse({
		description: DocumentationMessagesService.INVALID_LOGIN_CREDENTIALS,
	})
	async loginLocal(
		@Body() body: LoginUserRequestDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<LoginUserResponseDto> {
		this.logger.log("Signing in user");
		return await this.authenticationService.loginLocal(
			body.username,
			body.password,
		);
	}

	@Post("logout")
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@ApiOkResponse({
		description: DocumentationMessagesService.SUCCESSFUL_LOGOUT,
		type: null,
	})
	@ApiUnauthorizedResponse({
		description: DocumentationMessagesService.UNAUTHORIZED,
	})
	async logout(@Req() request): Promise<void> {
		const user = request.user;
		return await this.authenticationService.logout(user.userId);
	}

	@Get("refresh")
	@PublicRoute()
	@UseGuards(JwtRefreshAuthGuard)
	@UseInterceptors(
		new SerializeInterceptor(LoginUserResponseDto),
		SerializeTokenInterceptor,
	)
	@HttpCode(HttpStatus.CREATED)
	@ApiBearerAuth()
	@ApiCreatedResponse({
		description: DocumentationMessagesService.NEW_TOKEN_GENERATED,
		type: Tokens,
	})
	@ApiForbiddenResponse({
		description: DocumentationMessagesService.INVALID_TOKENS,
	})
	@ApiUnauthorizedResponse({
		description: DocumentationMessagesService.UNAUTHORIZED,
	})
	async refreshToken(@Req() request): Promise<LoginUserResponseDto> {
		const { userId, refreshToken } = request.user;

		this.logger.log("Registering user");
		return await this.authenticationService.refreshToken(
			userId,
			refreshToken,
		);
	}

	@Get("whoami")
	@UseInterceptors(CurrentUserInterceptor)
	@UseInterceptors(new SerializeInterceptor(UserResponseDto))
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@ApiOkResponse({
		description: DocumentationMessagesService.CURRENT_USER,
		type: UserResponseDto,
	})
	@ApiUnauthorizedResponse({
		description: DocumentationMessagesService.UNAUTHORIZED,
	})
	whoAmI(@Req() request: Request): UserResponseDto {
		return request.user as UserResponseDto;
	}
}
