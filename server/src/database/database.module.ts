import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DatabaseConstantsService } from './database-constants.service';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ DatabaseConstantsService ],
			imports: [ DatabaseModule ],
			useFactory: async (databaseConstantsService: DatabaseConstantsService): Promise<TypeOrmModuleOptions> => {
				return {
					type: "postgres",
					database: databaseConstantsService.DB_NAME,
					host: databaseConstantsService.DB_HOST,
					port: databaseConstantsService.DB_PORT,
					entities: [ "dist/**/*.entity{.ts,.js}" ],
					synchronize: databaseConstantsService.DB_SYNCHRONIZE,
					username: databaseConstantsService.DB_USER,
					password: databaseConstantsService.DB_PASSWORD
				};
			}
		}),
	],
	exports: [ DatabaseConstantsService ],
	providers: [
		DatabaseConstantsService,
	]
})
export class DatabaseModule {
}
