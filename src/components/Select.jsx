import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full space-y-2'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='inline-block ml-1 text-sm font-semibold text-text-light/70 dark:text-text-dark/70'
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-3 rounded-2xl bg-white/50 dark:bg-surface-dark/40 border border-gray-100 dark:border-white/5 w-full text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/40 focus:border-primary-dark transition-all duration-300 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-white dark:bg-background-dark text-text-light dark:text-text-dark">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)