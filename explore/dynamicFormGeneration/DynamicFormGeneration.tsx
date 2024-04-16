import './dynamicFormGeneration.scss';
import { CustomInputSearchBar } from '../customInputClasses/CustomInputSearchBar';
import { CustomInputNbr } from '../customInputClasses/CustomInputNbr';
import { CustomInputTxt } from '../customInputClasses/CustomInputTxt';
import { CustomSelectorTxt } from '../customInputClasses/CustomSelector';
import {
	ModArray,
	Model,
	ModEnum,
	ModNum,
	ModObj, ModParent,
	ModSearchBar,
	ModSingle,
	ParentModel
} from '../../interfaces/PythonModels.ts';
import {Component} from 'react';
import {filterKeys} from '../../utils/exploreUtils/filterKeys.ts';
import {HatModels} from '../../interfaces/HatModels.ts';
import {snakeCaseToSentence} from '../../utils/strings/snakeCaseToSentence.ts';
import {ConfigDropLine} from '../../utils/exploreUtils/configDropLine.tsx';
import {removeUnderscore} from '../../utils/strings/removeUnderscore.ts';
import {DynamicFormGroupGeneration} from '../DynamicFormGroupGeneration.tsx';
import DynamicFormGroupControls from '../DynamicFormGroupControls.tsx';

export type ContentModel = ContentModelArray | ContentModelObject | string | number | boolean | null | undefined;
export type ContentModelArray = Array<ContentModel>;
export type ContentModelObject = { [k: string]: ContentModel };

interface ParentModelComponentProps {
	model: ParentModel;
	config?: Record<string, any>;
	locked?: boolean;
	uniqueKey?: string;
	parentKey?: string;
	searchableGroup?: boolean;
}

/**
 * The purpose of this component is to generate a form based on a model.
 * The model is a JSON object that describes the structure of the form.
 * The form is generated recursively.
 * The form is generated with the following rules:
 * - If the model is an object, the form will be a parent form.
 * - If the model is an array, the form will be an array form.
 * - If the model is a string, the form will be a string form.
 * - If the model is a number, the form will be a number form.
 * - If the model is a boolean, the form will be a boolean form.
 * - If the model is null or undefined, the form will be a null form.
 * - If the model is an enum, the form will be an enum form.
 *
 * Authors: Maximilien Valenzano & Yvan Petruzzi
 */

/**
 * Basic structures :
 * the get() method returns the content of children forms.
 *
 * The ParentModelComponent is a component that renders a parent form.
 *
 */

export class ParentModelComponent extends Component<ParentModelComponentProps, {
	locked?: boolean
	config: Record<string, any> | undefined;
}> {
	private _model: ParentModel;
	private _childRefs: ElementModelComponent[] = [];
	private _uniqueKey: string | undefined;
	private _parentKey: string | undefined;
	private _searchableGroup: boolean | undefined;

	constructor(props: ParentModelComponentProps) {
		super(props);
		this._model = props.model;
		this._uniqueKey = props.uniqueKey;
		this._parentKey = props.parentKey;
		this._searchableGroup = props.searchableGroup;
		this.state = {
			locked: props.locked,
			config: props.config,
		};
	}

	/********************************************************************************************
	 * 									Getters													*
	 ********************************************************************************************/
	get(): ContentModelObject {
		if (!this._childRefs) return {};
		const content: ContentModelObject = {};
		for (const child of this._childRefs) {
			content[child.getModelKey()] = child.get();
		}
		return content;
	}

	/********************************************************************************************
	 * 								Ref functions												*
	 ********************************************************************************************/
	addRef(ref: ElementModelComponent) {
		if (!this._childRefs) {
			this._childRefs = [];
		}
		this._childRefs = this._childRefs.filter(r => r !== null);
		if (this._childRefs.includes(ref)) return;
		this._childRefs.push(ref);
	}

	/********************************************************************************************
	 * 								Render functions											*
	 ********************************************************************************************/
	render() {
		if (this._searchableGroup) {
			const {
				hasFilteredKeys,
				hasNoFilteredKeys
			} = this._searchableGroup ? filterKeys(this._model) : { hasFilteredKeys: {}, hasNoFilteredKeys: {} };
			// in SearchableGroup we don't want to render the Quantity key as first like it's done in the other groups
			const filteredKeys = Object.keys(hasFilteredKeys).sort((a) => a !== 'Quantity' ? -1 : 1);
			const notFilteredKeys = Object.keys(hasNoFilteredKeys).sort((a) => a === 'Quantity' ? -1 : 1);

			const updateData = (data: Record<string, any>) => {
				Object.keys(data).forEach((key) => {
					const tmpRef = this._childRefs.filter((e) => e._modelKey === key)[0]?._ref;
					if (!tmpRef) return;
					tmpRef.setVal(data[key]);
				});
			};
			return (
				<>
					{filteredKeys
						.map((key, i) =>
							<ElementModelComponent
								key={this._uniqueKey ? `${i}_${this._uniqueKey}` : `${i}_${key}`}
								lineOpen={!this._model[key].optional}
								modelKey={key}
								model={this._model[key]}
								config={this.state.config}
								ref={this.addRef.bind(this)}
								locked={this.state.locked}
								uniqueKey={this._uniqueKey}
								parentKey={this._parentKey}
								updateData={updateData.bind(this)}
							/>)
					}
					<details>
						<summary><b>Advanced details</b></summary>
						{notFilteredKeys
							.sort((a) => this._model[a].optional ? 1 : -1)
							.map((key, i) =>
								<ElementModelComponent
									key={this._uniqueKey ? `${i}_${this._uniqueKey}` : `${i}_${key}`}
									lineOpen={!this._model[key].optional}
									modelKey={key}
									model={this._model[key]}
									config={this.state.config}
									ref={this.addRef.bind(this)}
									locked={this.state.locked}
									uniqueKey={this._uniqueKey}
									parentKey={this._parentKey}
								/>)
						}
					</details>
				</>
			);

		} else {
			const keys = Object.keys(this._model) as (keyof ParentModel)[];
			keys.sort((a) => a === 'Quantity' ? -1 : 1);

			return (
				<>
					{keys
						.sort((a) => this._model[a].optional ? 1 : -1)
						.map((key, i) =>
							<ElementModelComponent
								key={this._uniqueKey ? `${i}_${this._uniqueKey}` : `${i}_${key}`}
								lineOpen={!this._model[key].optional}
								modelKey={key}
								model={this._model[key]}
								config={this.state.config}
								ref={this.addRef.bind(this)}
								locked={this.state.locked}
								uniqueKey={this._uniqueKey}
								parentKey={this._parentKey}
							/>)
					}
				</>
			);
		}
	}
}

interface ElementModelComponentProps {
	modelKey: string;
	model: Model;
	lineOpen?: boolean;
	config?: Record<string, any>;
	locked?: boolean;
	uniqueKey?: string;
	parentKey?: string;
	updateData?: (data: Record<string, any>) => void;
}

export class ElementModelComponent extends Component<ElementModelComponentProps, {
	childrenIndexes: number[],
	lineOpen?: boolean,
	editMode: boolean,
	locked?: boolean,
	config?: Record<string, any> | undefined;
}> {
	_modelKey: string;
	private _model: Model;
	private _childRefs: (ParentModelComponent | ElementModelComponent)[] = [];
	_ref: any; // this should be a ref of type CustomInputTxt | CustomInputNbr | CustomInputQtt | CustomSelectorTxt
	// index is passed from the parent when we are in an array, it is used to know which element of the array we are rendering
	private _uniqueKey: string | undefined;
	private _parentKey: string | undefined;
	private _updateData: ((data: Record<string, any>) => void) | undefined;

	constructor(props: ElementModelComponentProps) {
		super(props);
		this._modelKey = props.modelKey;
		this._model = props.model;
		this._uniqueKey = props.uniqueKey;
		this._parentKey = props.parentKey;
		this._updateData = props.updateData;

		this.state = {
			childrenIndexes: [],
			editMode: false,
			locked: props.locked,
			config: props.config
		};
	}

	componentDidMount() {
		if (this._model.type === 'array' || this._model.type === 'object' || this._model.type in HatModels) {
			// if config is filled
			// take elements from config to fill the array
			if (this.state.config && this.state.config[this._modelKey]) {
				this.setState({ childrenIndexes: [...Array(this.state.config[this._modelKey].length).keys()] });
			} else if (!this._model.optional) {
				this.setState({ childrenIndexes: [0] });
			}
		}
		this.setState({ lineOpen: this.props.lineOpen });
	}

	/********************************************************************************************
	 * 									Getters													*
	 ********************************************************************************************/
	getModelKey() {
		return this._modelKey;
	}

	get(): ContentModel {
		try {
			if ((this._model.type === 'object' || this._model.type in HatModels) && this._childRefs) {
				let content: ContentModel;
				for (const child of this._childRefs) {
					content = child.get();
				}
				return content;
			} else if (this._model.type === 'array' && this._childRefs) {
				const content: ContentModelArray = [];
				for (const child of this._childRefs) {
					content.push(child.get());
				}
				return content;
			} else {
				// Returns null if the validation failed (input will throw an error catch by parent to format it)
				// Returns the value if the validation succeeded
				// Returns undefined if the value is optional and not filled
				if (this._ref.validation()) {
					return this._ref.getValue();
				} else {
					return null;
				}
			}
		} catch (e: any) {
			throw new Error(`${snakeCaseToSentence(this._modelKey)}: ${e.message}`);
		}

	}

	/********************************************************************************************
	 * 								Ref functions												*
	 ********************************************************************************************/
	// add a child ref to the list of child refs
	addRef(ref: ParentModelComponent | null) {
		if (!this._childRefs) {
			this._childRefs = [];
		}
		if (!ref) return;
		if (this._childRefs.includes(ref)) return;
		this._childRefs.push(ref);
	}

	// remove a child ref from the list of child refs
	removeRef(i: number) {
		if (!this._childRefs) return;
		this._childRefs.splice(this.state.childrenIndexes.findIndex(n => n == i), 1);
		this.setState(s => ({ childrenIndexes: s.childrenIndexes.filter(index => index !== i) }));
		// switch edit mode to false if the last possible element is removed
		// We are checking @ + 1 because the state is not updated yet
		if (this.state.childrenIndexes.length === 1 || (this.state.childrenIndexes.length === 2 && this._model.optional === false)) {
			this.setState(({ editMode: false }));
		}
	}

	toggleLine = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		this.setState(s => ({ lineOpen: !s.lineOpen }));
	};

	toggleEdit = () => {
		this.setState(s => ({ editMode: !s.editMode }));
	};

	/********************************************************************************************
	 * 								Render functions											*
	 ********************************************************************************************/
	renderArray() {
		const model = this._model as ModArray;
		const add = () => {
			if (this.state.childrenIndexes.length === 0) {
				this.setState({ childrenIndexes: [0] });
			} else {
				this.setState(s => ({ childrenIndexes: [...s.childrenIndexes, s.childrenIndexes[s.childrenIndexes.length - 1] + 1] }));
			}
		};
		const remove = (i: number) => {
			this.removeRef(i);
		};

		// if the array is optional and the config is not filled we don't want to render anything
		if (this.state.locked && this.state.config && !this.state.config[this._modelKey]) {
			return (<></>);
		}
		return (
			<div className={'data-group-wrap'}>
				{(!this.state.locked || this.state.config && this.state.config[this._modelKey]) &&
					<ConfigDropLine
						keyName={this._modelKey}
						isOptional={model.optional}
						onClickCallback={this.toggleLine}
						isOpen={this.state.lineOpen}
						title={this._modelKey}
						ariaLabel={this._modelKey}
						key={`${this._modelKey}_drop_line`}
					/>}
				{this.state.childrenIndexes.map(i =>
					<div key={`${this._modelKey}_${i}`} className={`data-group ${this.state.lineOpen ? '' : 'hidden'}`}>
						<DynamicFormGroupGeneration
							model={model}
							index={i}
							remove={remove}
							locked={this.state.locked}
							childrenIndexes={this.state.childrenIndexes}
							editMode={this.state.editMode}
							modelKey={this._modelKey}
							addRef={this.addRef.bind(this)}
							config={this.state.config}
							searchableGroup={model.canHaveSuggestions}
						/>
					</div>)}
				<DynamicFormGroupControls
					locked={this.state.locked}
					lineOpen={this.state.lineOpen}
					modelKey={this._modelKey}
					childrenIndexes={this.state.childrenIndexes}
					toggleEdit={this.toggleEdit}
					add={add}
					type={'array'}
					optional={model.optional}
				/>
			</div>
		);
	}

	renderObject() {
		const model = this._model as ModObj;

		const add = () => {
			// Object can have only one single children
			if (this.state.childrenIndexes.length === 0) {
				this.setState({ childrenIndexes: [0] });
			}
		};
		const remove = (i: number) => {
			this.removeRef(i);
		};

		// if the object is optional and the config is not filled we don't want to render anything
		if (this.state.locked && this.state.config && !this.state.config[this._modelKey]) {
			return (<></>);
		}
		return (
			<div className={'data-group-wrap'}>
				{(!this.state.locked || this.state.config && this.state.config[this._modelKey]) &&
					<ConfigDropLine
						keyName={this._modelKey}
						isOptional={model.optional}
						onClickCallback={this.toggleLine}
						isOpen={this.state.lineOpen}
						title={this._modelKey}
						ariaLabel={this._modelKey}
						key={`${this._modelKey}_drop_line`}
					/>}
				{this.state.childrenIndexes.length > 0 &&
					<div key={`${this._modelKey}`} className={`data-group ${this.state.lineOpen ? '' : 'hidden'}`}>
						<DynamicFormGroupGeneration
							model={model}
							remove={remove}
							locked={this.state.locked}
							childrenIndexes={this.state.childrenIndexes}
							editMode={this.state.editMode}
							modelKey={this._modelKey}
							addRef={this.addRef.bind(this)}
							config={this.state.config}
							searchableGroup={model.canHaveSuggestions}
						/>
					</div>}
				<DynamicFormGroupControls
					locked={this.state.locked}
					lineOpen={this.state.lineOpen}
					modelKey={this._modelKey}
					childrenIndexes={this.state.childrenIndexes}
					toggleEdit={this.toggleEdit}
					add={add}
					type={'object'}
					optional={model.optional}
				/>
			</div>
		);
	}

	renderNumber() {
		// if the object is optional and the config is not filled we don't want to render anything
		if (this.state.locked && this.state.config && !this.state.config[this._modelKey]) {
			return (<></>);
		}
		const model = this._model as ModNum;
		return <CustomInputNbr
			optional={model.optional ?? false}
			initialValue={this.state.config ? this.state.config[this._modelKey] : model.minValue ?? 0}
			label={removeUnderscore(this._modelKey)}
			step={model.step}
			ref={el => {
				if (el) this._ref = el;
			}}
			locked={this.state.locked}
			uniqueKey={`${this._modelKey}_${this._uniqueKey ?? ''}`}
		/>;
	}

	renderString() {
		// if the object is optional and the config is not filled we don't want to render anything
		if (this.state.locked && this.state.config && !this.state.config[this._modelKey]) {
			return (<></>);
		}
		const model = this._model as ModSingle;
		return <CustomInputTxt
			optional={model.optional ?? false}
			initialValue={this.state.config ? this.state.config[this._modelKey] : ''}
			label={removeUnderscore(this._modelKey)}
			ref={el => {
				if (el) this._ref = el;
			}}
			locked={this.state.locked}
			uniqueKey={`${this._modelKey}_${this._uniqueKey ?? ''}`}
		/>;
	}

	renderEnum() {
		// if the object is optional and the config is not filled we don't want to render anything
		if (this.state.locked && this.state.config && !this.state.config[this._modelKey]) {
			return (<></>);
		}
		const model = this._model as ModEnum;
		return <CustomSelectorTxt
			optional={model.optional ?? true}
			initialValue={this.state.config ? this.state.config[this._modelKey] : ''}
			options={model.options}
			optionName={`${this._modelKey}`}
			label={this._modelKey}
			ref={el => {
				if (el) this._ref = el;
			}}
			locked={this.state.locked}
			uniqueKey={`${this._modelKey}_${this._uniqueKey ?? ''}`}
		/>;
	}

	renderSearchBar() {
		// if the object is optional and the config is not filled we don't want to render anything
		if (this.state.locked && this.state.config && !this.state.config[this._modelKey]) {
			return (<></>);
		}
		const updateData = (data: Record<string, any>) => {
			if (this._updateData) {
				this._updateData(data);
			}
		};
		const model = this._model as ModSearchBar;
		return <CustomInputSearchBar
			optional={model.optional ?? false}
			initialValue={this.state.config ? this.state.config[this._modelKey] : ''}
			label={'Reference name'}
			ref={el => {
				if (el) this._ref = el;
			}}
			locked={this.state.locked}
			uniqueKey={`${this._modelKey}_${this._uniqueKey ?? ''}`}
			parentKey={this._parentKey ?? ''}
			updateData={updateData}
		/>;
	}

	renderHatModel() {
		const model = this._model as ModParent;

		const add = () => {
			// Object can have only one single children
			if (this.state.childrenIndexes.length === 0) {
				this.setState({ childrenIndexes: [0] });
			}
		};
		const remove = (i: number) => {
			this.removeRef(i);
		};

		// if the object is optional and the config is not filled we don't want to render anything
		if (this.state.locked && this.state.config && !this.state.config[this._modelKey]) {
			return (<></>);
		}
		return (
			<div className={'data-group-wrap'}>
				{(!this.state.locked || this.state.config && this.state.config[this._modelKey]) &&
					<ConfigDropLine
						keyName={this._modelKey}
						isOptional={model.optional}
						onClickCallback={this.toggleLine}
						isOpen={this.state.lineOpen}
						key={`${this._modelKey}_drop_line`}
					/>}
				{this.state.childrenIndexes.length > 0 &&
					<div key={`${this._modelKey}`} className={`data-group ${this.state.lineOpen ? '' : 'hidden'}`}>
						<DynamicFormGroupGeneration
							model={model}
							remove={remove}
							locked={this.state.locked}
							childrenIndexes={this.state.childrenIndexes}
							editMode={this.state.editMode}
							modelKey={this._modelKey}
							addRef={this.addRef.bind(this)}
							config={this.state.config}
						/>
					</div>}
				<DynamicFormGroupControls
					locked={this.state.locked}
					lineOpen={this.state.lineOpen}
					modelKey={this._modelKey}
					childrenIndexes={this.state.childrenIndexes}
					toggleEdit={this.toggleEdit}
					add={add}
					type={'object'}
					optional={model.optional}
				/>
			</div>
		);
	}

	// render the appropriate form based on the model type
	render() {
		if (this._model.type === 'array') {
			return this.renderArray();
		}
		if (this._model.type === 'object') {
			return this.renderObject();
		}
		if (this._model.type === 'string') {
			return this.renderString();
		}
		if (this._model.type === 'int' || this._model.type === 'float') {
			return this.renderNumber();
		}
		if (this._model.type in HatModels) {
			return this.renderHatModel();
		}
		if (this._model.type === 'enum') {
			return this.renderEnum();
		}
		if (this._model.type === 'searchBar') {
			return this.renderSearchBar();
		}
	}
}