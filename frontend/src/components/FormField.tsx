import React from 'react';

interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    className = '',
}) => {
    return (
        <div className="relative">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-200 mb-1"
            >
                {label} {required && <span className="text-error">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`w-full px-4 py-2 bg-white/10 border ${error
                        ? 'border-error/60 focus:border-error'
                        : 'border-gray-600 focus:border-at-blue'
                    } rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-at-blue transition-colors ${className}`}
            />
            {error && (
                <p className="absolute -bottom-5 left-0 text-xs text-error mt-1">{error}</p>
            )}
        </div>
    );
};

export default FormField;