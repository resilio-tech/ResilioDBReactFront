import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import {CircularButton} from '../components/buttons/CircularButton.tsx';

interface DynamicFormGroupControlsProps {
	locked?: boolean;
	lineOpen?: boolean;
	modelKey: string;
	childrenIndexes: number[];
	toggleEdit: () => void;
	add: () => void;
	type: 'object' | 'array';
	optional?: boolean;
}
export const DynamicFormGroupControls = ({
	locked,
	lineOpen,
	modelKey,
	childrenIndexes,
	toggleEdit,
	add,
	type,
	optional
}: DynamicFormGroupControlsProps): JSX.Element => {
	const canAdd = (): boolean => {
		if (type === 'object') {
			return childrenIndexes.length === 0;
		}
		return true;
	};
	return (<>
		{!locked && <div className={`array-controls-containers ${lineOpen ? '' : 'hidden'}`}>
			{canAdd() &&
                <CircularButton
                	aria-label={`Add a new ${modelKey}`}
                	title={`${modelKey}`}
                	onClick={add}
                	icon={<FontAwesomeIcon icon={faPlus} size={'xs'}/>}
                />}
			{(optional || childrenIndexes.length > 1) &&
				<CircularButton
					aria-label={`Edit ${modelKey}`}
					title={`${modelKey}`}
					onClick={toggleEdit}
					icon={<FontAwesomeIcon icon={faPencil} size={'xs'}/>}
				/>}
		</div>}
	</>);
};

export default DynamicFormGroupControls;
