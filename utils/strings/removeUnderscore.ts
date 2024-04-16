export const removeUnderscore = (str: string): string => {
	const words = str.split('_');
	return words.join(' ');
};