import React from 'react';
import {getConfigRequest} from '../../requests/getConfigRequest.ts';
import RequiredStar from '../../components/RequiredStar/RequiredStar.tsx';
import {snakeCaseToSentence} from '../../utils/strings/snakeCaseToSentence.ts';
import {SearchInputList} from '../../components/SearchInput/SearchInput.tsx';
import {suggestionsRequest} from '../../requests/suggestionsRequest.ts';

type SearchInputValue = { name: string, type: string };

export interface SearchEquipmentType {
	name: string,
	type: string
}

type CustomInputSearchBarProps = {
	optional: boolean;
	label: string;
	initialValue?: string;
	locked?: boolean;
	uniqueKey?: string;
	parentKey: string;
	updateData: (data: Record<string, any>) => void;
};

export class CustomInputSearchBar extends React.Component<CustomInputSearchBarProps, {
	suggestions: SearchEquipmentType[];
	value: string;
	dataSearched: string,
	search: string,
}> {
	private readonly _props: CustomInputSearchBarProps;

	constructor(props: CustomInputSearchBarProps) {
		super(props);
		this._props = props;
		this.state = {
			value: '', // What is written in HTML input tag
			suggestions: [],
			dataSearched: '', // The data sent to the suggestion API endpoint
			search: '', // The data sent when e.g. Enter is pressed
		};
	}

	getValue(): string | undefined {
		if (this.state.search) {
			return this.state.search;
		}
		return undefined;
	}

	validation(): boolean { return true; }

	querySuggestions = (value: SearchInputValue): void => {
		suggestionsRequest(value.name, this._props.parentKey)
			.then((data) => {
				this.setState(() => ({ suggestions: data.list }));
			});
	};

	getConfig = (value: SearchInputValue) => {
		getConfigRequest(value.name, value.type)
			.then((data) => {
				this.props.updateData(data);
			});
	};

	handleSearchChange = (value: SearchInputValue): void => {
		this.setState(() => ({ search: value.name }));
		this.querySuggestions(value);
	};

	handleSearch = (value: SearchInputValue): void => {
		this.setState(() => ({ suggestions: [] }));
		this.setState(() => ({ search: value.name }));
		this.getConfig(value);
	};

	render(): JSX.Element {
		return (<div className={'custom-input search-bar'}>
			<label
				htmlFor={`${this._props.uniqueKey}`}
				style={{ fontWeight: `${this._props.locked ? 'bold' : 'normal'}` }}
			>
				{!this._props.optional && !this._props.locked && <RequiredStar />}
				{snakeCaseToSentence(this._props.label)}
			</label>
			{this._props.locked
				? <>{this.props.initialValue}</>
				: <>
					<InputSearchBar
						suggestions={this.state.suggestions}
						onChange={this.handleSearchChange}
						onSearch={this.handleSearch}
						uniqueKey={`${this._props.uniqueKey}`}
						initialValue={this._props.initialValue}
					/>
				</>
			}
		</div>);
	}
}

interface SearchInputListElement {
	name: string,
	type: string,
	element: React.ReactElement,
}

const InputSearchBar = ({
	suggestions,
	onChange,
	onSearch,
	uniqueKey,
	initialValue,
}: {
	suggestions: SearchEquipmentType[],
	onChange: (value: SearchInputValue) => void,
	onSearch: (value: SearchInputValue) => void,
	uniqueKey: string,
	initialValue?: string,
}): JSX.Element => {
	const [searchValue, setSearchValue] = React.useState({ search: initialValue ?? '' });
	const [currentListIndex, setCurrentListIndex] = React.useState(-1);

	let list: SearchInputListElement[] = [];

	list = suggestions.map(s => ({
		name: s.name,
		type: s.type,
		element: (<span className={'country-name'}>{s.name}</span>)
	}));

	const handleFormFilling = (search: string): void => {
		const selectedItem = list.find((item) => item.name === search);
		if (!selectedItem) return;
		onSearch(selectedItem);
	};

	const handleSelectInList = (value: string): void => {
		setSearchValue({ search: value });
		handleFormFilling(value);
	};

	const handleSearchChange = (value: string): void => {
		// const selectedItem = list.find((item) => item.name === value);
		// if (!selectedItem) return;
		setSearchValue({ search: value });
		onChange({ name: value, type: 'cpus' });
	};

	const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setCurrentListIndex((prevIndex) =>
				prevIndex < list.length - 1 ? prevIndex + 1 : prevIndex
			);
		}
		else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setCurrentListIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
		}
		else if (e.key === 'Enter') {
			e.preventDefault();
			if (!value && !(list.length > 0)) return;
			if (currentListIndex === -1)
				handleSelectInList(list[0] ? list[0].name : value);
			else
				handleSelectInList(list[currentListIndex].name);

			handleFormFilling(searchValue.search);
			setCurrentListIndex(-1);
		}
	};

	return (<>
		<input
			type="text"
			name="name"
			id={`${uniqueKey}`}
			placeholder="Reference name"
			value={searchValue.search}
			onChange={(e) => handleSearchChange(e.target.value)}
			onKeyDown={(e) => handleKeyDown(e, searchValue.search)}
		/>
		{list.length > 0 && <SearchInputList
			list={list}
			currentListIndex={currentListIndex}
			setCurrentListIndex={(value: number) => setCurrentListIndex(value)}
			onItemSelected={handleSelectInList}
			onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, searchValue.search)}
		/>}
	</>);

};
