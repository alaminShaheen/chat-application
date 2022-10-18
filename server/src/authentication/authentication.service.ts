import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	Logger
} from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AppErrorMessagesService } from "../app-messages/app-error-messages.service";
import { TokenConstantsService } from "../constants/token-constants.service";
import { UsersService } from "../users/users.service";
import { Tokens } from "./dtos/tokens.dto";

@Injectable()
export class AuthenticationService {
	private readonly logger = new Logger(AuthenticationService.name);
	
	constructor (
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly tokenConstantsService: TokenConstantsService,
		private readonly errorMessagesService: AppErrorMessagesService
	) {
	}
	
	async registerLocal (username: string, password: string): Promise<Tokens> {
		try {
			const user = await this.usersService.findOneByUsername(username);
			if (user) throw new BadRequestException(this.errorMessagesService.EMAIL_EXISTS);
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			const newUser = await this.usersService.create(username, hashedPassword, salt);
			
			const tokens = await this.generateTokens(newUser.id, newUser.username);
			
			await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);
			
			return tokens;
		} catch (error) {
			this.logger.error(error);
			if (error instanceof BadRequestException) throw error;
			throw new InternalServerErrorException(this.errorMessagesService.SERVER_ERROR);
		}
	}
	
	async loginLocal (username: string, password: string): Promise<Tokens> {
		try {
			const user = await this.usersService.findOneByUsername(username);
			if (!user) throw new BadRequestException(this.errorMessagesService.INVALID_CREDENTIALS_PROVIDED);
			
			const passwordsMatch = await bcrypt.compare(password, user.password);
			
			if (!passwordsMatch) throw new BadRequestException(this.errorMessagesService.INVALID_CREDENTIALS_PROVIDED);
			
			const tokens = await this.generateTokens(user.id, user.username);
			
			await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
			
			return tokens;
		} catch (error) {
			this.logger.error(error);
			if (error instanceof BadRequestException) throw error;
			else throw new InternalServerErrorException(this.errorMessagesService.SERVER_ERROR);
		}
	}
	
	async logout (userId: number): Promise<void> {
		await this.usersService.update(userId, { refreshToken: null });
	}
	
	async refreshToken (userId: number, refreshToken: string): Promise<Tokens> {
		try {
			const user = await this.usersService.findOneById(userId);
			
			if (!user) throw new ForbiddenException(this.errorMessagesService.FORBIDDEN);
			
			const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
			
			if (!isRefreshTokenValid) throw new ForbiddenException(this.errorMessagesService.FORBIDDEN);
			
			const tokens = await this.generateTokens(user.id, user.username);
			await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
			
			return tokens;
		} catch (error) {
			if (error instanceof ForbiddenException) throw error;
			else throw new InternalServerErrorException(this.errorMessagesService.SERVER_ERROR);
			
		}
	}
	
	async updateRefreshTokenHash (userId: number, refreshToken: string): Promise<void> {
		try {
			const hashedRefreshToken = await bcrypt.hash(
				refreshToken,
				this.tokenConstantsService.REFRESH_TOKEN_SALT_ROUNDS
			);
			await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(this.errorMessagesService.SERVER_ERROR);
		}
	}
	
	async generateTokens (userId: number, username: string): Promise<Tokens> {
		try {
			const tokenPayload = { userId, username };
			const [ accessToken, refreshToken ] = await Promise.all([
				this.jwtService.signAsync(tokenPayload, {
					expiresIn: this.tokenConstantsService.ACCESS_TOKEN_VALIDITY_DURATION,
					secret: this.tokenConstantsService.ACCESS_TOKEN_SECRET
				}),
				this.jwtService.signAsync(tokenPayload, {
					expiresIn: this.tokenConstantsService.REFRESH_TOKEN_VALIDITY_DURATION,
					secret: this.tokenConstantsService.REFRESH_TOKEN_SECRET
				})
			]);
			return new Tokens(accessToken, refreshToken);
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(this.errorMessagesService.SERVER_ERROR);
		}
	}
}
