import React, { useId } from 'react'
import { Input as ShadcnInput } from "./ui/input"
import { cn } from "../lib/utils"

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full space-y-2'>
            {label && (
                <label 
                    className='inline-block ml-1 text-sm font-semibold text-text-light/70 dark:text-text-dark/70' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <ShadcnInput
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-2xl border border-gray-100 dark:border-white/5 bg-white/50 dark:bg-surface-dark/40 px-4 py-3 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-light/40 dark:placeholder:text-text-dark/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark/40 focus-visible:border-primary-dark transition-all disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input