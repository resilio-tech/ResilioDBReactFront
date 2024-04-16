import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CircularButton} from '../components/buttons/CircularButton.tsx';
import {ParentModelComponent} from './dynamicFormGeneration/DynamicFormGeneration.tsx';

interface DynamicFormGroupGenerationProps {
	model: any;
	index?: number;
	remove: (i: number) => void;
	locked?: boolean;
	childrenIndexes: number[];
	editMode: boolean;
	modelKey: string;
	addRef: (ref: ParentModelComponent) => void;
	config?: Record<string, any>;
	searchableGroup?: boolean;
}

export const DynamicFormGroupGeneration = ({
model,
index,
remove,
locked,
childrenIndexes,
editMode,
modelKey,
addRef,
config,
searchableGroup = false
}: DynamicFormGroupGenerationProps): JSX.Element => {
	const configToSend = () => {
		if (config && config[modelKey]) {
			if (index !== undefined) {
				return config[modelKey][index];
			}
			return config[modelKey];
		}
		return undefined;
	};
	return (<>
		<div className={'delete-group-wrap'}>
			<hr className={`${editMode ? 'edit' : ''}`}/>
			{(model.optional || childrenIndexes.length > 1) && !locked &&
                <div className={`delete-button-wrap ${editMode ? 'edit' : ''}`}>
                    <CircularButton
                        aria-label={`Delete ${modelKey}`}
                        title={`Delete ${modelKey}`}
                        onClick={() => remove(index ?? 0)}
                        icon={<FontAwesomeIcon icon={faTrash} size={'xs'}/>}
                        size={'small'}
                    />
                </div>}
		</div>
		<div className={'data-inputs'}>
			<ParentModelComponent
				model={{...model.params}}
				ref={addRef}
				config={configToSend()}
				locked={locked}
				uniqueKey={index ? `${modelKey}_${index}` : undefined}
				key={`parent_model_${modelKey}_${index ?? 0}`}
				parentKey={modelKey}
				searchableGroup={searchableGroup}
			/>
		</div>
	</>);
};
