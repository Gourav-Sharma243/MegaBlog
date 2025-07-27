import React, { useId } from 'react';

function Select(
  {
    options,
    label,
    className = '',
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 w-full rounded-lg bg-white text-gray-900 border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition duration-200 ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
