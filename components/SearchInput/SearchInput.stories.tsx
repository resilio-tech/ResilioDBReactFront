import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchInput from './SearchInput';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Components/SearchInput',
	component: SearchInput,
	argTypes: {
		value: {
			control: {
				type: 'object',
				options: {
					search: 'test',
					country: 'France'
				}
			}
		},
		suggestions: [],
		onChange: {
			action: 'onChange'
		}
	}
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
	<SearchInput {...args} />
);

export const Default = Template.bind({});

Default.args = {
	value: {
		search: 'test',
		country: 'France'
	},
	suggestions: [],
	onChange: action('onChange')
};