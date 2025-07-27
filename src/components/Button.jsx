import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-3 rounded-lg ${bgColor} ${textColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 hover:brightness-90 transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
