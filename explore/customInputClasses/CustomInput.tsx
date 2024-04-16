import React from 'react';

export abstract class CustomInput<T> extends React.Component<
    {
        optional: boolean;
        initialValue?: T;
        locked?: boolean;
        options?: string[];
        optionName?: string;
        label?: string;
        step?: number;
        minValue?: number;
        uniqueKey?: string;
        autoFocus?: boolean;
    },
    {
        value: T | undefined;
        validData: boolean;
        optional: boolean;
        locked: boolean;
        label: string;
    }
> {
    setVal(value: T) {
        this.setState(() => ({ value }));
    }
    getValue(): T | undefined {
        if (this.state.value) {
            return this.state.value;
        }
        return undefined;
    }

    validation(): boolean {
        return true;
    }
}
