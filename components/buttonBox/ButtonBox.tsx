import React from 'react';
import { TextButtonProps } from '../Button';
import '../Button.scss';

const ButtonBox = ({
	primary = false,
	onClick,
	label,
	className = '',
	disabled = false,
	tooltip = '',
}: TextButtonProps): JSX.Element => {
	const typeButton = `component-text-button ${primary ? 'primary' : 'secondary'}`;
	const buttonClassName = `component-text-button-box ${typeButton} ${className}`;
	return (
		<button
			type={'button'}
			className={buttonClassName}
			onClick={onClick}
			disabled={disabled}
			title={tooltip}
		>{label}</button>
	);
};

export default ButtonBox;