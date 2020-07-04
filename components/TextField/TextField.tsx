import React from 'react';
import {ShowIf} from "../show-if";

export const TextField = ({
    label,
    onChange,
    onBlur,
    value,
    errors,
    placeholder,
    name,
    type = 'text',
}) => {
    const inputClass = ["shadow appearance-none border 500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"]

    if (errors) {
        inputClass.push('border-red-500')
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <input
                className={inputClass.join(' ')}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <ShowIf condition={errors}>
                <p className="text-red-500 text-xs italic">
                    {errors}
                </p>
            </ShowIf>
        </div>
    );
}
