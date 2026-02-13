import React from "react"


interface Props {
    disabled?: boolean
    type?: "submit" | "button" | "reset"
    className?: string
    children?: React.ReactNode
    onClick?: (e: React.MouseEvent) => void
}

export const Button = (
    { disabled, type, className, children, onClick, ...rest }: Props
) => {
    return <button className={`
                        flex justify-center items-center gap-2 w-fit h-10 rounded-xl bg-island \
                        transition-colors duration-200 ease-in enabled:cursor-pointer ${className}
                   `}
                   disabled={disabled}
                   type={type}
                   onClick={onClick}
                   {...rest}
    >
        { children }
    </button>
}