import React, {TextareaHTMLAttributes} from 'react';
import {ShowIf} from "../show-if";

type TextAreaProps = {
    label?: string,
    value?: string | number,
    errors: string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea = ({
    label,
    value,
    errors,
    name,
    ...textAreaAttributes
}: TextAreaProps) => {
    const inputClass = ["shadow appearance-none border 500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"]

    if (errors) {
        inputClass.push('border-red-500')
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <textarea
                name={name}
                className={inputClass.join(' ')}
                value={value}
                {...textAreaAttributes}
            />
            <ShowIf condition={errors}>
                <p className="text-red-500 text-xs italic">
                    {errors}
                </p>
            </ShowIf>
        </div>
    );
}
