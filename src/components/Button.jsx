import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-orange-600",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button 
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-md ${bgColor} ${textColor} hover:bg-opacity-90 dark:shadow-xl ${className}`} 
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}
