import { ApiProperty } from "@nestjs/swagger";
import { Tokens } from "authentication/dtos/tokens.dto";
import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "../../users/dtos/user-response.dto";

export class LoginUserResponseDto {
	@ApiProperty({
		type: UserResponseDto,
		description: "User information of the user logging in.",
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
