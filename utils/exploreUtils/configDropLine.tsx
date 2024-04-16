import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import RequiredStar from '../../components/RequiredStar/RequiredStar.tsx';
import {snakeCaseToSentence} from '../strings/snakeCaseToSentence.ts';

export const ConfigDropLine = ({
	keyName,
	isOptional,
	onClickCallback,
	isOpen,
	title,
	ariaLabel
}: {
	keyName: string,
	isOptional: boolean | undefined,
	onClickCallback: (e: any) => void,
	isOpen?: boolean,
	title?: string,
	ariaLabel?: string
}): JSX.Element => {
	return (
		<button
			className={'drop-line'}
			key={`${keyName}_drop-line`}
			id={`${keyName}_drop-line`}
			onClick={onClickCallback}
			title={title ?? 'Button'}
			aria-label={ariaLabel ?? 'Button'}
		>
			<span className={'keyname'}>
				{isOptional ? <>&nbsp;</> : <RequiredStar />}
				<h2>{snakeCaseToSentence(keyName)}</h2>
			</span>
			<span className={'chevron'}>
				{isOpen ? <FontAwesomeIcon icon={faChevronDown}/> : <FontAwesomeIcon icon={faChevronLeft}/> }
			</span>
		</button>
	);
};