import {ContentModel, ContentModelObject} from '../../explore/dynamicFormGeneration/DynamicFormGeneration.tsx';

/**
 * Replicates the items in the model that have a quantity property
 * and removes the quantity property from the items
 *
 * @param obj
 */
export function replicateAndClean(obj: ContentModel): ContentModel {
	if (Array.isArray(obj)) {
		const replicatedItems: ContentModel[] = [];
		obj.forEach(item => {
			if (typeof item === 'object' && item !== null && Object.prototype.hasOwnProperty.call(item, 'quantity')) {
				const quantity = (item as any).quantity;
				delete (item as any).quantity;

				for (let i = 0; i < quantity; i++) {
					replicatedItems.push({ ...item });
				}
			} else {
				replicatedItems.push(replicateAndClean(item));
			}
		});
		return replicatedItems;
	} else if (obj !== null && typeof obj === 'object') {
		const newObj: ContentModelObject = {};
		Object.keys(obj).forEach(key => {
			const cleanedValue = replicateAndClean((obj as ContentModelObject)[key]);
			// Check if the value is an array and not empty before adding it to the new object
			if (!Array.isArray(cleanedValue) || cleanedValue.length > 0) {
				newObj[key] = cleanedValue;
			}
		});
		return newObj;
	}
	return obj;
}
