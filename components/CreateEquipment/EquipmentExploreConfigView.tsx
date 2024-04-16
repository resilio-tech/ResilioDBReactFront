import './ModelSelectionInterface.scss';
import {ContentModelObject, ParentModelComponent} from '../../explore/dynamicFormGeneration/DynamicFormGeneration.tsx';
import {CustomInputTxt} from '../../explore/customInputClasses/CustomInputTxt.tsx';
import {replicateAndClean} from '../../utils/exploreUtils/replicateAndClean.ts';
import {computeModel} from '../../requests/computeModel.ts';
import {ZodIssue} from 'zod';
import {formatParentModelObject} from '../../utils/exploreUtils/formatModelObject.ts';
import {ParentModel, PythonModels} from '../../interfaces/PythonModels.ts';
import {filterObject} from '../../utils/objects/filterObject.ts';
import {HatModels} from '../../interfaces/HatModels.ts';
import ExplorePageHeader from '../ExploreHeader/ExplorePageHeader.tsx';
import {snakeCaseToSentence} from '../../utils/strings/snakeCaseToSentence.ts';
import AlertBox from '../../../components/AlertBox/AlertBox.tsx';
import {createRef, useRef, useState} from 'react';
import {ParentModelComponentConfigView} from '../ParentModelComponent/ParentModelComponent.tsx';

/**
 * This page allows the user to create a new equipment or edit an existing one
 *
 * Functional logic:
 * The equipment parameter mechanic and effects
 * 		- If we have an equipment in the parameters, it means that we are editing an existing equipment
 *		This will allow us a lot of detection, like knowing what buttons we will display according to this parameter
 *	    - If we get the hash, it means the pipeline of data collection is done, a useEffect is triggered and it will fire
 *	    the saveConfiguration function
 *
 * @param libraryId
 * @param type
 * @param backCallback
 * @param fullBackCallback
 * @param changeEquipmentCallback
 * @param equipment
 * @constructor
 */
const EquipmentExploreConfigView = ({
	type,
	backCallback,
	models,
	setResponse,
}: {
	type: string;
	backCallback: () => void;
	models: PythonModels;
	setResponse: (response: any) => void;
}): JSX.Element => {
	/*********************************************************************
	 * 								STATES						   		 *
	 *********************************************************************/
	/**
	 * error: the error message to display
	 * nameOfConfig: the name of the config
	 */
	const [error, setError] = useState<string>('');
	const [nameOfConfig, setNameOfConfig] = useState<string | undefined>(undefined);

	/*********************************************************************
	 * 								REFS						   		 *
	 *********************************************************************/
	const parentRefSingles = useRef<ParentModelComponent>(null);
	const parentRefObjectsAndArrays = useRef<ParentModelComponent>(null);
	const nameRef = createRef<CustomInputTxt>();

	/*********************************************************************
	 * 								FUNCTIONS					   		 *
	 *********************************************************************/
	const getAndTestConfiguration = () => {
		let singleValues: ContentModelObject | undefined;
		let objectsAndArraysValues: ContentModelObject | undefined;
		try {
			nameRef.current?.validation();
			setNameOfConfig(nameRef.current?.getValue());
			singleValues = parentRefSingles.current?.get();
			objectsAndArraysValues = parentRefObjectsAndArrays.current?.get();
		} catch (e: any) {
			setError(e.message);
			return;
		}
		const request = {
			assembly: true,
			data: [
				replicateAndClean({
					...singleValues,
					...objectsAndArraysValues,
					wanted_name: nameRef.current?.getValue()
				})
			]
		};
		setResponse(undefined);
		computeModel(request, type)
			.then((res) => {
				setResponse(res);
			})
			.catch((err) => {
				if (typeof err.response.data.error === 'object' && err.response.data.error.issues) {
					const issues = err.response.data.error.issues;
					if (issues.length > 0) {
						const errorString = issues.map((issue: ZodIssue) => issue.message).join('\n');
						setError(errorString);
					}
				} else setError(err.message);
			});
	};
	/*********************************************************************
	 * 								VARIABLES					   		 *
	 *********************************************************************/
	const model = formatParentModelObject(models[type]);

	/*********************************************************************
	 * 								FILTERS					   		 *
	 *********************************************************************/
	const [modelSingles] = useState(
		filterObject<ParentModel>(
			model,
			([, value]) => !['object', 'array', ...Object.keys(HatModels)].includes(value.type as HatModels)
		)
	);
	const [modelObjectsAndArrays] = useState(
		filterObject<ParentModel>(model, ([, value]) =>
			['object', 'array', ...Object.keys(HatModels)].includes(value.type as HatModels)
		)
	);

	return (
		<>
			<div className={'customise-equipment-explore-wrap'}>
				<ExplorePageHeader onClickBack={backCallback}/>
				{/************************************************************/}
				{/************************ EDIT VIEW *************************/}
				{/************************************************************/}
				<div className={'configuration-options'}>
					<h1>
						<b>Type :</b> {snakeCaseToSentence(type ?? '')}
					</h1>
					<ParentModelComponentConfigView
						parentRefSingles={parentRefSingles}
						modelSingles={modelSingles}
						parentRefObjectsAndArrays={parentRefObjectsAndArrays}
						modelObjectsAndArrays={modelObjectsAndArrays}
						nameRef={nameRef}
						name={nameOfConfig}
					/>
					{error.length > 0 && (
						<div className="alert-display">
							<AlertBox
								key={'exploreAlert'}
								message={error}
								type={'error'}
								customClass={'small'}
								onClose={() => setError('')}
							/>
						</div>
					)}
					<button onClick={getAndTestConfiguration}>Save configuration</button>
				</div>
			</div>
			)
		</>
	);
};

export default EquipmentExploreConfigView;
