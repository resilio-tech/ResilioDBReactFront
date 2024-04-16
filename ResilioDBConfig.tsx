import {useEffect, useState} from 'react';
import {PythonModels} from './interfaces/PythonModels.ts';
import {getPythonEquipmentModels} from './requests/getPythonEquipmentModels.ts';
import ModelSelectionInterface from './components/CreateEquipment/ModelSelectionInterface.tsx';
import EquipmentExploreConfigView from './components/CreateEquipment/EquipmentExploreConfigView.tsx';

const ResilioDBConfig = ({setResponse}: { setResponse: (response: any) => void}) => {
	/*********************************************************************
	 * 								SELECTORS					   		 *
	 *********************************************************************/
	const [models, setModels] = useState<PythonModels>({});

	/*********************************************************************
	 * 								STATES						   		 *
	 *********************************************************************/
	const [currentMode, setCurrentMode] = useState<'ModelSelection' | 'EquipmentView'>('ModelSelection');
	const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);

	/*********************************************************************
	 * 								HOOKS						   		 *
	 *********************************************************************/
	useEffect(() => {
		getPythonEquipmentModels().then((res) => {
			setModels(res);
		});
	}, []);

	/*********************************************************************
	 * 								REINITIALIZE					   	 *
	 *********************************************************************/
	const reinitializeSelectedModel = () => {
		setSelectedModel(undefined);
	};

	/*********************************************************************
	 * 								HANDLERS					   		 *
	 *********************************************************************/
	const handleModelSelection = (model: string) => {
		setSelectedModel(model);
		setCurrentMode('EquipmentView');
	};

	return (
		<>
			{/************************************************************/}
			{/*********** CREATE A NEW EQUIPMENT INTERFACE ***************/}
			{/************************************************************/}
			{currentMode === 'ModelSelection' && (
				<>
					<ModelSelectionInterface
						handleModelSelection={(model: string) => handleModelSelection(model)}
						models={models}
						title="Choose an equipment model"
					/>
				</>
			)}
			{/************************************************************/}
			{/****** CREATE/CONSULT/EDIT AN EQUIPMENT INTERFACE **********/}
			{/************************************************************/}
			{currentMode === 'EquipmentView' && (
				<>
					<EquipmentExploreConfigView
						type={selectedModel ?? ''}
						backCallback={() => {
							reinitializeSelectedModel();
							setCurrentMode('ModelSelection');
						}}
						models={models}
						setResponse={setResponse}
					/>
				</>
			)}
		</>
	);
};

export default ResilioDBConfig;
