export const filterKeys = (model: any): { hasFilteredKeys: any, hasNoFilteredKeys: any } => {
	const keysToFilter = ['name', 'quantity'];
	if (!model) {
		return { hasFilteredKeys: {}, hasNoFilteredKeys: {} };
	}

	return Object.keys(model).reduce(({ hasFilteredKeys, hasNoFilteredKeys }: { hasFilteredKeys: any, hasNoFilteredKeys: any }, key: string) => {
		if (keysToFilter.includes(key)) {
			hasFilteredKeys[key] = model[key];
		} else {
			hasNoFilteredKeys[key] = model[key];
		}
		return { hasFilteredKeys, hasNoFilteredKeys };
	}, { hasFilteredKeys: {}, hasNoFilteredKeys: {} });
};