import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap () {
	const app = await NestFactory.create(AppModule);
	const configService = app.get<ConfigService>(ConfigService)
	app.enableCors({
		credentials: true,
		origin: configService.get<string>("CLIENT_URL")
	});
	app.use(cookieParser());
	app.setGlobalPrefix("api");
	
	const documentBuilderConfig = new DocumentBuilder()
	.setTitle("Chat Application")
	.setDescription("The Chat Application API Specifications")
	.setVersion("1.0")
	.addTag("Chat App")
	.addBearerAuth()
	.build();
	
	const documentOptions: SwaggerDocumentOptions = {
		operationIdFactory: (
			controllerKey: string,
			methodKey: string
		) => methodKey
	};
	
	const document = SwaggerModule.createDocument(app, documentBuilderConfig, documentOptions);
	SwaggerModule.setup("api", app, document);
	
	await app.listen(3000);
	Logger.log(`Application is running on ${await app.getUrl()}`);
}

void bootstrap();
