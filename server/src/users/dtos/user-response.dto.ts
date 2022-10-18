import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserResponseDto {
	@ApiProperty({
		type: Number,
		description: "User id of the user"
	})
	@Expose()
	public id: string;
	
	@ApiProperty({
		type: String,
		description: "Username of the user"
	})
	@Expose()
	public username: string;
	
	@ApiProperty({
		type: String,
		description: "Creation date of the user"
	})
	@Expose()
	public createdAt: Date;
	
	@ApiProperty({
		type: String,
		description: "Date when user was last updated"
	})
	@Expose()
	public updatedAt: Date;
	
	@ApiProperty({
		type: String,
		required: false,
		description: "Avatar string of the user"
	})
	@Optional()
	@Expose()
	public avatar?: string;
}
