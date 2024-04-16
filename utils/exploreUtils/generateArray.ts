export const generateArray = (model: any): any => {
	const response: { [k: string]: unknown } = {};
	for (const key in model) {
		if (key.includes('enum') || typeof model[key] !== 'object') {
			response[key] = model[key];
		}
		else {
			response[key] = generateArray(model[key]);
		}
	}
	return response;
};
