import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class Tokens {
	@ApiProperty({
		type: String,
		description: "The bearer token that must be set in authentication header for every authenticated requests"
	})
	@Expose()
	public accessToken: string;
	
	@Exclude()
	public refreshToken: string;
	
	constructor (accessToken, refreshToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}
