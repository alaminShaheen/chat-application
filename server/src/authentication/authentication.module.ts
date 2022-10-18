import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
	controllers: [ AuthenticationController ],
	providers: [ AuthenticationService ],
	imports: [ JwtModule.register({}), UsersModule ]
})
export class AuthenticationModule {
}
