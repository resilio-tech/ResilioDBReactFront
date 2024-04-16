const Labels: Record<string, string> = {
	'litho': 'Lithography',
};

export const convertLabelShortcutToFullname = (str: string): string => {
	return Labels[str.toLowerCase()] || str;
};