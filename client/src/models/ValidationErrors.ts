export type ValidationErrors = {
	error: string;
	message:
		| Array<{
				constraints: Record<string, string>;
				property: string;
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }>
		| string;
	statusCode: number;
};
