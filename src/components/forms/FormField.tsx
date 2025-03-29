interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  rows?: number;
  disabled?: boolean;
}

export function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  rows,
  disabled,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          rows={rows || 3}
          className="block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-colors"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          className="block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-colors"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
        />
      )}
    </div>
  );
}
