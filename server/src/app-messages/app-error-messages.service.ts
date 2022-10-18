import { Injectable } from '@nestjs/common';

@Injectable()
export class AppErrorMessagesService {
	get EMAIL_EXISTS () {
		return "User with email already exists";
	}
	
	get SERVER_ERROR () {
		return "An internal server error occurred";
	}
	
	get INVALID_CREDENTIALS_PROVIDED () {
		return "Invalid credentials provided";
	}
	
	get USER_NOT_FOUND () {
		return "User does not exist";
	}
	
	get USER_UNAUTHENTICATED () {
		return "User is not authenticated";
	}
	
	get FORBIDDEN () {
		return "User does not have permission to access this server";
	}
	
	get FORBIDDEN_RESOURCE () {
		return "User does not have permission to execute this action";
	}
	
	get DATABASE_SEEDING () {
		return "Database seeding failed";
	}
	
	get RESOURCE_DOES_NOT_EXIST () {
		return "Resource does not exist";
	}
}
