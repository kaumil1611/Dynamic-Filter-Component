import React from 'react';

export const Select = ({ options = [], className = '', placeholder, ...props }) => {
    return (
        <select
            className={`select ${className}`}
            {...props}
        >
            {placeholder && <option value="" disabled selected>{placeholder}</option>}
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};
