import React from "react"

interface Props {
    className?: string
    placeholder?: string
    type?: string
    name?: string
    children?: React.ReactNode
}

export const Input = (
    { className, placeholder, type, name, children, ...rest }: Props
) => {
    return <label className={`flex items-center gap-2 px-4 py-1 h-10 rounded-xl bg-island ${className}`}>
        <input className="size-full text-xl text-element placeholder:text-element-sub"
               placeholder={placeholder}
               type={type}
               name={name}
               {...rest}
        />
        { children }
    </label>
}