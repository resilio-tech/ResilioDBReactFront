import {ModArray, ModObj, ModParent, ParentModel, quantityParam, searchParam} from '../../interfaces/PythonModels.ts';
import {HatModels} from '../../interfaces/HatModels.ts';


export const addQuantityToArrayType = (model: ParentModel) => {
	// add quantity to array type
	const newModel: ParentModel = {};
	Object.keys(model).forEach((key) => {
		if (model[key].type === 'array') {
			const modelArray = { ...model[key] } as ModArray;
			const newParams = { ...modelArray.params, ...quantityParam };
			newModel[key] = { ...modelArray, params: newParams };
		}
		else newModel[key] = model[key];
	});
	return newModel;
};

export const addSearchParamToCanHaveSuggestions = (model: ParentModel) => {
	// add a search parameter to a model that can have suggestions
	const newModel: ParentModel = {};
	Object.keys(model).forEach((key) => {
		if (Object.keys(model[key]).includes('canHaveSuggestions')) {
			// Check if the modal has a params key
			if (!Object.keys(model[key]).includes('params')) {
				newModel[key] = model[key];
				return;
			} else {
				// Add SearchParam to the params key
				// { ...model[key] } is used to avoid mutating the original model and having permission errors
				const searchableModel = { ...model[key] } as ModArray | ModObj;
				searchableModel.params = { ...searchableModel.params, ...searchParam };
				newModel[key] = searchableModel;
			}
		}
		else newModel[key] = model[key];
	});
	return newModel;
};

/**
 * @description format the model object to be used in the UI
 * The model object in this specific case is a nested hat model inside a parent model
 * @param typeOfModel
 * @param model
 */
export const formatModelObject = (typeOfModel: keyof typeof HatModels, model: ModParent): ModParent => {
	const { params, optional } = model;
	let newParams = { ...params };
	delete newParams['wanted_name'];
	delete newParams['usage_percent'];
	newParams = addQuantityToArrayType(newParams);
	newParams = addSearchParamToCanHaveSuggestions(newParams);
	return { type: typeOfModel, params: newParams, optional };
};

/**
 * @description format the parent model object to be used in the UI
 * @param model
 */
export const formatParentModelObject = (model: ParentModel): ParentModel => {
	let newModel = { ...model };
	// filter ['wanted_name', 'usage_percent'] from the model
	delete newModel['wanted_name'];
	delete newModel['usage_percent'];
	newModel = addQuantityToArrayType(newModel);
	newModel = addSearchParamToCanHaveSuggestions(newModel);

	Object.keys(newModel).map((parameter: any) => {
		if (parameter in HatModels) {
			const nestedParentModel = newModel[parameter] as ModParent;
			newModel[parameter] = formatModelObject(parameter, nestedParentModel);
		}
	});
	return newModel;
};
