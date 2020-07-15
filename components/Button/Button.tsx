import React, {ButtonHTMLAttributes} from 'react';

//enum variants = { 'primary', 'secondary' };

type ButtonProps = {
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'danger',
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({children, type, className = '', variant = null, ...buttonAttributes}: ButtonProps) => {
    const baseClass = ["inline-block border rounded py-2 px-3 text-black hover:bg-gray-200"];
    
    if (className) {
        baseClass.push(className);
    }

    if (variant === 'primary') {
        baseClass.push('bg-blue-500 hover:bg-blue-600 text-white border-blue-500');
    }

    if (variant === 'danger') {
        baseClass.push('border-red-500 bg-red-500 hover:bg-red-600 text-white');
    }

    return (
        <button className={baseClass.join(' ')}
            type={type}
            {...buttonAttributes}
        >{children}
        </button>
    );
}
