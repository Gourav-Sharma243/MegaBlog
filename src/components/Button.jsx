import React from "react";
import { Button as ShadcnButton } from "./ui/button";
import { cn } from "../lib/utils";

export default function Button({
    children,
    type = "button",
    className = "",
    variant = "default",
    size = "default",
    disabled = false,
    ...props
}) {
    return (
        <ShadcnButton 
            variant={variant}
            size={size}
            type={type}
            disabled={disabled}
            className={cn(
                "rounded-2xl font-bold transition-all duration-300 active:scale-[0.98]",
                variant === "default" && "bg-primary-dark hover:bg-primary-dark/90 shadow-[0_10px_30px_rgba(99,102,241,0.2)]",
                className
            )} 
            {...props}
        >
            {children}
        </ShadcnButton>
    )
}
