import { CustomInput } from './CustomInput';
import { z } from 'zod';
import {snakeCaseToSentence} from '../../utils/strings/snakeCaseToSentence.ts';
import {locateAndSeparateUnit} from '../../utils/strings/locateAndSeparateUnit.ts';
import {convertLabelShortcutToFullname} from '../../utils/strings/convertLabelShortcutToFullname.ts';
import RequiredStar from '../../components/RequiredStar/RequiredStar.tsx';

export const ICustomInputNbr = z.object({
	value: z.number().min(0.001)
});

type CustomInputNbrProps = {
	optional: boolean;
	label: string;
	isParentOptional?: boolean;
	initialValue?: number;
	locked?: boolean;
	step?: number;
	minValue?: number;
	uniqueKey?: string;
};

export class CustomInputNbr extends CustomInput<number> {
	private step: number;
	private minValue: number;
	private readonly uniqueKey: string;
	constructor(props: CustomInputNbrProps) {
		super(props);
		this.step = props.step ?? 1;
		this.minValue = props.minValue ?? 0;
		this.uniqueKey = props.uniqueKey ?? '';
		this.state = {
			value: props.initialValue,
			validData: true,
			optional: props.optional,
			locked: props.locked ?? false,
			label: props.label,
		};
	}

	validation(): boolean {
		if (this.state.optional) return true;
		const isValidated = ICustomInputNbr.safeParse({ value: this.state.value }).success;
		this.setState(() => ({ validData: isValidated }));
		if (!isValidated) throw new Error('The field is not filled correctly');
		return isValidated;
	}

	render(): JSX.Element {
		const propLabel = snakeCaseToSentence(this.state.label);
		const [label, unit] = locateAndSeparateUnit(propLabel);
		const verboseLabel = convertLabelShortcutToFullname(label);

		return (
			<div className={'custom-input'}>
				<label
					htmlFor={`${this.uniqueKey}`}
					style={{ fontWeight: `${this.state.locked ? 'bold' : 'normal'}` }}
				>
					{!this.state.optional && !this.state.locked && <RequiredStar />}
					{verboseLabel}{unit && ` (${unit})`}
				</label>
				{this.state.locked
					? <>{this.state.value}</>
					: <>
						<input
							className={`${this.state.validData ? '' : 'invalid-input'}`}
							type={'number'}
							value={this.state.value}
							name={`${this.uniqueKey}`}
							id={`${this.uniqueKey}`}
							key={`${this.uniqueKey}_${this.state.label}`}
							min={this.minValue}
							step={this.step}
							onChange={(e) => {
								this.setVal(e.target.valueAsNumber);
							}}
							onFocus={e => e.target.select()}
							onBlur={e => {
								if (Number.isNaN(e.target.valueAsNumber)) {
									this.setVal(0);
								}
							}}
						/>
					</>}
			</div>
		);
	}
}
