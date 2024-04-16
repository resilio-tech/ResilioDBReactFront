import React, { useEffect } from 'react';
import { CountryFlags } from './CountryFlags';
import './SearchInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { snakeCaseToSentence } from '../../utils/strings/snakeCaseToSentence';

export type CountryKey = keyof typeof CountryFlags;

interface SearchInputListElement {
  name: string,
  type: string,
  element: React.ReactElement
}

export interface SearchInputValue {
  search: string;
  country: CountryKey | '';
}

export interface SearchEquipmentType {
	name: string,
	type: string
}

export interface SearchInputProps {
	value?: SearchInputValue;
	suggestions: SearchEquipmentType[];
	onChange?: (value: SearchInputValue) => void;
	onSearch?: (value: SearchInputValue) => void;
	returnedName?: string;
}

export const SearchInputList = ({ list, currentListIndex, onItemSelected, setCurrentListIndex, onKeyDown }: {
	list: SearchInputListElement[],
	currentListIndex: number,
	onItemSelected: (value: string) => void,
	setCurrentListIndex?: (value: number) => void,
	onKeyDown?: (e: React.KeyboardEvent, value: string) => void
}): JSX.Element => {
	return (
		<>
			<ul className={'search-input-list'} aria-label={'input-suggestions'}>
				{list.map((el, index) => (
					<li key={el.name}
						className={`list-item ${currentListIndex === index ? 'current' : ''}`}
						onClick={() => onItemSelected(el.name)}
						tabIndex={0}
						onFocus={() => setCurrentListIndex && setCurrentListIndex(index)}
						onKeyDown={(e) => onKeyDown && onKeyDown(e, el.name)}
					>
						{el.element}
					</li>
				))}
			</ul>
		</>
	);
};

const SearchInput = ({
	value,
	suggestions,
	onChange,
	onSearch,
	returnedName
}: SearchInputProps): JSX.Element => {
	const inputSearchRef = React.useRef<HTMLInputElement>(null);
	const inputCountryRef = React.useRef<HTMLInputElement>(null);

	const [searchValue, setSearchValue] = React.useState(value || { search: '', country: '' });
	const [selectCountry, setSelectCountry] = React.useState(false);
	const [currentListIndex, setCurrentListIndex] = React.useState(-1);

	useEffect(() => {
		if (returnedName){
			setSearchValue({ search: returnedName, country: searchValue.country });
		} else {
			setSearchValue({ search: '', country: '' });
		}
	}, [returnedName]);

	const handleSearchChange = (value: string): void => {
		setSearchValue({ search: value, country: searchValue.country });
		onChange && onChange({ search: value, country: searchValue.country as CountryKey });
	};

	const handleCountryChange = (value: CountryKey): void => {
		setSelectCountry(true);
		setSearchValue({ search: searchValue.search, country: value });
		onChange && onChange({ search: searchValue.search as string, country: value });
	};

	const handleSelectInList = (value: string): void => {
		if (selectCountry) {
			setSearchValue({ search: searchValue.search, country: value });
			handleFormFilling(searchValue.search, value);
		} else {
			setSearchValue({ search: value, country: searchValue.country });
			handleFormFilling(value, searchValue.country);
		}
	};

	const handleCountryButtonClick = (): void => {
		if (!selectCountry && inputCountryRef.current) {
			inputCountryRef.current.focus();
		}
		setSelectCountry(!selectCountry);
		setCurrentListIndex(-1);
	};

	const handleSearchButtonClick = (): void => {
		if (selectCountry) {
			if (inputSearchRef.current) {
				inputSearchRef.current.focus();
			}
			setSelectCountry(false);
		} else {
			handleFormFilling(searchValue.search, searchValue.country);
		}
		setCurrentListIndex(-1);
	};

	const handleFormFilling = (search: string, country: string): void =>{
		if (search== '') {
			setSelectCountry(false);
			if (inputSearchRef.current) {
				inputSearchRef.current.focus();
			}
		} else if (country == '') {
			setSelectCountry(true);
			if (inputCountryRef.current) {
				inputCountryRef.current.focus();
			}
		} else {
			onSearch && onSearch({ search, country: country as CountryKey });
			setSelectCountry(false);
		}
	};

	// Creating the list of suggestions
	const knownCountry = searchValue.country in CountryFlags;
	let image = '';
	if (knownCountry) {
		image = CountryFlags[searchValue.country as CountryKey].flag;
	}
	let list: SearchInputListElement[] = [];
	if (selectCountry) {
		const list_names = Object.keys(CountryFlags)
			.filter((country) => {
				if (searchValue.country === '') return true;
				if (searchValue.country) {
					const name = CountryFlags[country as CountryKey].name;
					return name.toLowerCase().includes(searchValue.country.toLowerCase());
				}
			});
		if (!(list_names.length == 1 && list_names[0] == searchValue.country)) {
			list = list_names.map((country) => ({
				name: country,
				type: 'server',
				element: (<>
					<img
						className='country-flag'
						src={CountryFlags[country as CountryKey].flag}
						alt={country}
					/>
					<span className={'country-name'}>
						{CountryFlags[country as CountryKey].name}
					</span>
				</>)
			}));
		}
	} else {
		list = suggestions.map(s => ({
			name: s.name,
			type: s.type,
			element: (<span className={'country-name'}>{s.name} <small style={{ color: 'gray' }}>({snakeCaseToSentence(s.type)})</small></span>)
		}));
	}

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
			if (selectCountry) setSelectCountry(false);
			handleFormFilling(searchValue.search, searchValue.country);
			setCurrentListIndex(-1);
		}
	};

	return (
		<>
			<p>I want to know the environmental impact of ... </p>
			<div className="search-input">
				<input
					ref={inputSearchRef}
					className={`input ${selectCountry ? 'hidden' : ''}`}
					type="text"
					name="search_device"
					id="search_device"
					placeholder="MacBook Pro 14-inch, Dell PowerEdge M640, ..."
					value={searchValue.search}
					onChange={(e) => handleSearchChange(e.target.value)}
					onKeyDown={(e) => handleKeyDown(e, searchValue.search)}
					autoFocus
				/>
				<div className="image">
					<button
						type="button"
						className="button"
						onClick={() => handleSearchButtonClick()}
						aria-label='Search Equipment'
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
				<div className="image country">
					<button
						type="button"
						className="button"
						onClick={() => handleCountryButtonClick()}
						aria-label='Search Country'
						title={knownCountry ? CountryFlags[searchValue.country as CountryKey].name : 'World'}
					>
						{knownCountry && (
							<img
								className="country-flag"
								src={image}
								alt={searchValue.country}
							/>
						)}
						{!knownCountry && (
							<FontAwesomeIcon icon={faGlobe} />
						)}
					</button>
				</div>
				<input
					ref={inputCountryRef}
					className={`input ${selectCountry ? '' : 'hidden'}`}
					type="text"
					name="search_country"
					id="search_country"
					placeholder="Find a country"
					value={searchValue.country}
					onChange={(e) => handleCountryChange(e.target.value as CountryKey)}
					onKeyDown={(e) => handleKeyDown(e, searchValue.country)}
				/>
				{list.length > 0 && <SearchInputList list={list} currentListIndex={currentListIndex} onItemSelected={handleSelectInList}/>}
			</div>	
			<p className='quote'>Consult the list of our different <Link to={'docs/reference_names'}>available references</Link>.</p>
		</>
	);
};

export default SearchInput;
