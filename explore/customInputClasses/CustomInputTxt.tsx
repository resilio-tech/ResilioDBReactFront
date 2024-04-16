import { CustomInput } from './CustomInput';
import { z } from 'zod';
import {snakeCaseToSentence} from '../../utils/strings/snakeCaseToSentence.ts';
import {locateAndSeparateUnit} from '../../utils/strings/locateAndSeparateUnit.ts';
import {convertLabelShortcutToFullname} from '../../utils/strings/convertLabelShortcutToFullname.ts';
import RequiredStar from '../../components/RequiredStar/RequiredStar.tsx';

export const ICustomInputTxt = z.object({
    value: z.string().min(1).max(50),
});

type CustomInputTxtProps = {
    optional: boolean;
    label: string;
    initialValue?: string;
    locked?: boolean;
    uniqueKey?: string;
    autoFocus?: boolean;
};

export class CustomInputTxt extends CustomInput<string> {
    private readonly uniqueKey: string;

    constructor(props: CustomInputTxtProps) {
        super(props);
        this.uniqueKey = props.uniqueKey ?? '';
        this.state = {
            value: props.initialValue ?? '',
            validData: true,
            optional: props.optional,
            locked: props.locked ?? false,
            label: props.label,
        };
    }

    validation(): boolean {
        if (this.state.optional) return true;
        const isValidated = ICustomInputTxt.safeParse({ value: this.state.value }).success;
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
                <label htmlFor={`${this.uniqueKey}`} style={{ fontWeight: `${this.state.locked ? 'bold' : 'normal'}` }}>
                    {!this.state.optional && !this.state.locked && <RequiredStar />}
                    {verboseLabel}
                    {unit && ` (${unit})`}
                </label>
                {this.state.locked ? (
                    <>{this.state.value}</>
                ) : (
                    <>
                        <input
                            className={`${this.state.validData ? '' : 'invalid-input'}`}
                            type={'text'}
                            name={`${this.uniqueKey}`}
                            id={`${this.uniqueKey}`}
                            key={`${this.uniqueKey}_${this.state.label}`}
                            value={this.state.value}
                            onChange={(e) => this.setVal(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            disabled={this.state.locked}
                            autoFocus={this.props.autoFocus}
                        />
                    </>
                )}
            </div>
        );
    }
}
