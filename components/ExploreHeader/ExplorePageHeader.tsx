import { Link } from 'react-router-dom';
import './ExplorePageHeader.scss';
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ExplorePageHeader = ({
	backUrl,
	onClickBack,
	buttons,
}:{
	backUrl?: string,
	onClickBack?: () => void,
	buttons?: Array<JSX.Element>
}):JSX.Element => {
	return (
		<div className={'explore-page-header-wrap'}>
			<button aria-label={'Go back'} className={'back-button'}>
				<Link to={`${backUrl ?? ''}`} onClick={onClickBack}>
					<FontAwesomeIcon icon={faArrowLeft} className={'back-icon'} key={`${backUrl ?? ''} arrow`}/>
				</Link>
			</button>
			{buttons && buttons.length && <div className={'buttons-wrap'}>
				{buttons.map((button, index) => (<Fragment key={`button-${index}`}>
					{button}
				</Fragment>))}
			</div>}
		</div>
	);
};

export default ExplorePageHeader;