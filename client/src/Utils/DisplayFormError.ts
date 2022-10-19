export class DisplayFormError {
	static required(field: string) {
		return `${field[0].toUpperCase() + field.slice(1)} is required.`;
	}

	static minLength(field: string, minLength: number) {
		return `${
			field[0].toUpperCase() + field.slice(1)
		} must be greater than ${minLength} characters.`;
	}

	static match(field: string) {
		return `${field[0].toUpperCase() + field.slice(1)} fields don't match.`;
	}
}
