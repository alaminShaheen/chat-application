import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "authentication/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "authentication/strategies/refresh-token.strategy";
import { UsersModule } from "../users/users.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";

@Module({
	controllers: [AuthenticationController],
	providers: [
		AuthenticationService,
		AccessTokenStrategy,
		RefreshTokenStrategy,
	],
	imports: [JwtModule.register({}), UsersModule],
})
export class AuthenticationModule {}
