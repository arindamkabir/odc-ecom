import React from 'react'

const PrimaryButton = ({ type = "button", className = "", ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button
            type={type}
            className={`max-w-xs flex-1 bg-black border border-transparent tracking-wider py-3 px-8 flex items-center justify-center text-sm font-medium text-white focus:outline-none sm:w-full uppercase disabled:bg-gray-400 ${className}`}
            {...props}
        />
    )
}

export default PrimaryButton