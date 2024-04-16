import { CustomInput } from './CustomInput';
import RequiredStar from '../../components/RequiredStar/RequiredStar.tsx';
import {snakeCaseToSentence} from '../../utils/strings/snakeCaseToSentence.ts';

type CustomSelectorTxtProps = {
    optional: boolean;
    label: string;
    options: string[];
    optionName: string;
    locked?: boolean;
    initialValue?: string;
    uniqueKey?: string;
};

export class CustomSelectorTxt extends CustomInput<string> {
    private options: string[];
    private readonly optionName: string;
    private readonly uniqueKey: string;

    constructor(props: CustomSelectorTxtProps) {
        super(props);
        this.options = props.options;
        this.optionName = props.optionName;
        this.uniqueKey = props.uniqueKey ?? '';
        this.state = {
            value: props.initialValue ?? undefined,
            validData: true,
            optional: props.optional,
            locked: props.locked ?? false,
            label: props.label,
        };
    }

    validation(): boolean {
        if (this.state.optional) return true;
        const isValid = this.state.value !== '';
        this.setState(() => ({ validData: isValid }));
        if (!isValid) throw new Error('The field is not filled correctly');
        return isValid;
    }

    render(): JSX.Element {
        const alphabeticallySortedOptions = [...this.options].sort((a, b) => a.localeCompare(b));
        return (
            <div className={'custom-input'}>
                <label htmlFor={`${this.uniqueKey}`} style={{ fontWeight: `${this.state.locked ? 'bold' : 'normal'}` }}>
                    {!this.state.optional && !this.state.locked && <RequiredStar />}
                    {snakeCaseToSentence(this.state.label)}
                </label>
                {this.state.locked ? (
                    <>{snakeCaseToSentence(this.state.value ?? '')}</>
                ) : (
                    <>
                        <select
                            disabled={this.state.locked}
                            className={`${this.state.validData ? '' : 'invalid-input'}`}
                            onChange={(e) => this.setVal(e.target.value)}
                            value={this.state.value ?? ''}
                            key={`${this.uniqueKey}_${this.state.label}`}
                            name={`${this.uniqueKey}`}
                            id={`${this.uniqueKey}`}
                        >
                            <option value={''} disabled>
                                Select a {snakeCaseToSentence(this.optionName)}
                            </option>
                            {alphabeticallySortedOptions.length > 0 &&
                                alphabeticallySortedOptions.map((opt, i) => (
                                    <option key={i} value={opt}>
                                        {snakeCaseToSentence(opt)}
                                    </option>
                                ))}
                        </select>
                    </>
                )}
            </div>
        );
    }
}
