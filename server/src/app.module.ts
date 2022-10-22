import { BadRequestException, Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { AppMessagesModule } from "./app-messages/app-messages.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ConstantsModule } from "./constants/constants.module";
import { DatabaseModule } from "./database/database.module";
import { ProfileModule } from "./profile/profile.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		DatabaseModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `${process.env.NODE_ENV}.env`,
		}),
		AppMessagesModule,
		UsersModule,
		AuthenticationModule,
		ConstantsModule,
		ProfileModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true,
				validationError: { value: false, target: false },
				exceptionFactory: (errors) =>
					new BadRequestException(errors, "Validation errors"),
			}),
		},
	],
})
export class AppModule {}
