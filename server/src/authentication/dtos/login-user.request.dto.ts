import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error--messages.service";

export class LoginUserRequestDto {
	@ApiProperty({
		type: String,
		example: "sakib122",
		description: "Username of the user logging in",
		required: true
	})
	@IsNotEmpty({ message: DtoErrorMessagesService.IS_REQUIRED(LoginUserRequestDto, "username") })
	@IsString({
		message: DtoErrorMessagesService.MUST_BE_TYPE(LoginUserRequestDto, "username", "string")
	})
	username: string;
	
	@ApiProperty({
		type: String,
		description: "Password of the user",
		required: true,
		example: "random-very-very-secure-password"
	})
	@IsNotEmpty({
		message: DtoErrorMessagesService.IS_REQUIRED(LoginUserRequestDto, "password")
	})
	@IsString({
		message: DtoErrorMessagesService.MUST_BE_TYPE(LoginUserRequestDto, "password", "string")
	})
	password: string;
}
