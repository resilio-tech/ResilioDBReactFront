import {PythonModels} from '../../interfaces/PythonModels.ts';
import {ReactNode} from 'react';
import ButtonBoxWithIcon from '../buttons/ButtonBoxWithIcon.tsx';
import {snakeCaseToSentence} from '../../utils/strings/snakeCaseToSentence.ts';
import ModelToIconMap from '../../utils/ModelToIconMap.tsx';
import {HatModels} from '../../interfaces/HatModels.ts';
import ExplorePageHeader from '../ExploreHeader/ExplorePageHeader.tsx';

const ModelSelectionInterface = ({
	goBackButtonCallback,
	handleModelSelection,
	models,
	title,
	paragraph
}: {
	goBackButtonCallback?: () => void;
	handleModelSelection: (model: string) => void;
	models: PythonModels;
	title: string;
	paragraph?: ReactNode;
}): JSX.Element => {
	const version: string = models.version as unknown as string;
	return (
		<div className={'create-equipment-explore-wrap'}>
			{goBackButtonCallback && <ExplorePageHeader onClickBack={goBackButtonCallback} />}
			<h2>{title}</h2>
			{paragraph && paragraph}
			<div className={'select-model'}>
				{Object.keys(models).map((key) => {
					if (key !== 'version') {
						return (
							<ButtonBoxWithIcon
								key={key}
								onClick={() => {
									handleModelSelection(key);
								}}
								label={snakeCaseToSentence(key)}
								tooltip={`Select ${key}`}
								centerIcon={ModelToIconMap[snakeCaseToSentence(key).toLowerCase() as HatModels]}
							/>
						);
					} else return null;
				})}
			</div>
			{version && (
				<p>
					<small>Current version: {version}</small>
				</p>
			)}
		</div>
	);
};

export default ModelSelectionInterface;
