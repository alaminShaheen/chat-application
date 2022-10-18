import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "../../users/dtos/user-response.dto";
import { Tokens } from "./tokens.dto";

export class RegisterUserResponseDto {
	@ApiProperty({
		type: UserResponseDto,
		description: "User information of the user registering.",
	})
	@Type(() => UserResponseDto)
	@Expose()
	user: UserResponseDto;
	
	@ApiProperty({
		type: Tokens,
		description: "Tokens associated with the user.",
	})
	@Type(() => Tokens)
	@Expose()
	tokens: Tokens;
}
