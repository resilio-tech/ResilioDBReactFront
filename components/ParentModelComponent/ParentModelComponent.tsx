import {RefObject} from 'react';
import {ParentModelComponent} from '../../explore/dynamicFormGeneration/DynamicFormGeneration.tsx';
import {ParentModel} from '../../interfaces/PythonModels.ts';
import {CustomInputTxt} from '../../explore/customInputClasses/CustomInputTxt.tsx';


export const ParentModelComponentConfigView = ({
    parentRefSingles,
    modelSingles,
    parentRefObjectsAndArrays,
    modelObjectsAndArrays,
    nameRef,
    name,
}: {
    parentRefSingles: RefObject<ParentModelComponent>;
    modelSingles: ParentModel;
    parentRefObjectsAndArrays: RefObject<ParentModelComponent>;
    modelObjectsAndArrays: ParentModel;
    nameRef: React.RefObject<CustomInputTxt>;
    name: string | undefined;
}): JSX.Element => {
    return (
        <div className="inputs">
            <div className="group-of-inputs">
                <CustomInputTxt
                    optional={false}
                    label={'Name of the configuration'}
                    locked={false}
                    initialValue={name ?? ''}
                    ref={nameRef}
                    autoFocus={true}
                />
                <ParentModelComponent model={modelSingles} ref={parentRefSingles} />
            </div>
            {Object.keys(modelObjectsAndArrays).length > 0 && (
                <div className="group-of-inputs">
                    <ParentModelComponent
                        model={modelObjectsAndArrays}
                        ref={parentRefObjectsAndArrays}
                    />
                </div>
            )}
        </div>
    );
};
