import './ButtonBoxWithIcon.scss';

/**
 * ButtonBox
 * @param onClick : function to call when button is clicked
 * @param icon : icon to display in the top right section of the button
 * @param centerIcon : optional centerIcon to display in middle section of the button
 * @param text : text to display in the bottom left section of the button
 * @param buttonClass : optional class to add to the button
 * @param tabIndex : optional tabIndex to add to the button
 * @example select a study and click the button at the very bottom of the "To start column"
 */
export const ButtonBoxWithIcon = ({
	onClick,
	icon,
	centerIcon,
	label,
	buttonClass,
	tabIndex,
	tooltip,
}: {
	onClick?: () => void,
	icon?: JSX.Element,
	centerIcon?: JSX.Element,
	label: string,
	buttonClass?: string,
	tabIndex?: number,
	tooltip: string
}): JSX.Element => {
	return (
		<div className='selection-button-div'>
			<button
				className={`select_button neumorphic ${buttonClass}`}
				onClick={onClick}
				tabIndex={tabIndex}
				title={tooltip}
			>
				{centerIcon && <div className={'button_box_center_icon'}>
					{centerIcon}
				</div>}
				{icon && <span className='icon_holder'>{icon}</span>}
				<p className='create_dataset_button_text'>{label}</p>
			</button>

		</div>
	);
};

export default ButtonBoxWithIcon;