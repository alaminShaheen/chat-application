import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error--messages.service";
import { Match } from "../../common/decorators/match.decorator";

export class RegisterUserRequestDto {
	@ApiProperty({
		type: String,
		example: "sakib567",
		description: "Username of the user registering",
		required: true
	})
	@IsNotEmpty({
		message: DtoErrorMessagesService.IS_REQUIRED(RegisterUserRequestDto, "username")
	})
	@IsString({
		message: DtoErrorMessagesService.MUST_BE_TYPE(RegisterUserRequestDto, "username", "string")
	})
	username: string;
	
	@ApiProperty({
		type: String,
		description: "Password of the user",
		required: true,
		example: "random-very-very-secure-password"
	})
	@IsNotEmpty({
		message: DtoErrorMessagesService.IS_REQUIRED(RegisterUserRequestDto, "password")
	})
	@IsString({
		message: DtoErrorMessagesService.MUST_BE_TYPE(RegisterUserRequestDto, "password", "string")
	})
	password: string;
	
	@ApiProperty({
		type: String,
		description: "'confirmPassword' field of the user must match with 'password' field",
		required: true,
		example: "random-very-very-secure-password"
	})
	@IsNotEmpty({
		message: DtoErrorMessagesService.IS_REQUIRED(RegisterUserRequestDto, "confirmPassword")
	})
	@IsString({
		message: DtoErrorMessagesService.MUST_BE_TYPE(RegisterUserRequestDto, "confirmPassword", "string")
	})
	@Match(RegisterUserRequestDto, (properties) => properties.password, {
		message: DtoErrorMessagesService.NOT_MATCH(RegisterUserRequestDto, "password", "confirmPassword")
	})
	confirmPassword: string;
}
