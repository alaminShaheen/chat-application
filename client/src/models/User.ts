export class User {
	constructor(public id: number, public username: string, public avatar?: string) {}

	static EMPTY = new User(0, "", "");
}
