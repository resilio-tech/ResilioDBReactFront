import {HatModels} from './HatModels.ts';

export type PythonModels = Record<string, ParentModel>;

export type ParentModel = Record<string, Model>;

export type Model = ModObj | ModArray | ModSingle | ModEnum | ModNum | ModSearchBar | ModParent;

export interface defaultModel {
    optional?: boolean;
    canHaveSuggestions?: boolean;
}

export interface ModParent {
    type: keyof typeof HatModels;
    params: ParentModel;
    optional?: boolean;
}

export interface ModObj extends defaultModel {
    type: 'object';
    params: ParentModel;
}

export interface ModArray extends defaultModel {
    type: 'array';
    params: ParentModel;
}

export interface ModSingle extends defaultModel {
    type: 'string' | 'boolean' | 'null' | 'undefined';
    value?: string | boolean | null | undefined;
}

export interface ModEnum extends defaultModel {
    type: 'enum';
    options: string[];
    value?: string;
}

export interface ModNum extends defaultModel {
    type: 'int' | 'float';
    step?: number;
    minValue?: number;
    value?: number;
}

export interface ModSearchBar extends defaultModel {
    type: 'searchBar';
}

export const quantityParam: ParentModel = {
    quantity: {
        type: 'int',
        optional: false,
        step: 1,
        minValue: 1,
        value: undefined
    }
};

export const searchParam: ParentModel = {
    name: {
        type: 'searchBar',
        optional: true
    }
};
