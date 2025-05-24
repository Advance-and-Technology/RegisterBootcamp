import React from 'react';

interface TextareaFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    rows?: number;
    className?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    rows = 3,
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
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
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

export default TextareaField;