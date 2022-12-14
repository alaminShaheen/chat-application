import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenConstantsService } from "../../constants/token-constants.service";
import { JwtPayload } from "../models/jwt-payload.model";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor (private readonly tokenConstantsService: TokenConstantsService) {
		// It will throw a 401 error by default if token is absent or expired
		// But to override it we can extend the error handling and auth logic in a custom guard
		// In this case it is jwt-auth.guard.ts
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: tokenConstantsService.ACCESS_TOKEN_SECRET
		});
	}
	
	// decodedJwtPayload contains decoded information from the access token
	validate (decodedJwtPayload: JwtPayload) {
		// Doing so will attach payload in request object to user field
		return decodedJwtPayload;
	}
}
