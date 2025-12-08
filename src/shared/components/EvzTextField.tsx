import React from 'react';

export interface EvzTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Reusable text field component
 * Pulled out of repeated JSX pieces
 */
function EvzTextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  className = '',
  ...props
}: EvzTextFieldProps): JSX.Element {
  return (
    <div className={`evz-text-field ${className}`}>
      {label && <label className="evz-text-field-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`evz-text-field-input ${error ? 'evz-text-field-input--error' : ''}`}
        {...props}
      />
      {error && <span className="evz-text-field-error">{error}</span>}
    </div>
  );
}

export default EvzTextField;

