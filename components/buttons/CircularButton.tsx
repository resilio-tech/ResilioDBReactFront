import React from 'react';
import './Button.scss';

export const CircularButton = ({
    onClick,
    icon,
    className,
    ariaLabel,
    title,
    size = 'medium',
    disabled = false
}: {
    onClick: () => void;
    icon: JSX.Element;
    className?: string;
    ariaLabel?: string;
    title?: string;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}): JSX.Element => {
    return (
        <div className={'circular-button-container'}>
            <button
                className={`${className ?? ''} circular-button ${size} ${disabled ? 'disabled' : ''}`}
                aria-label={`${ariaLabel ?? 'button'}`}
                title={`${title ?? 'button'}`}
                onClick={onClick}
                disabled={disabled}
            >
                {icon}
            </button>
        </div>
    );
};