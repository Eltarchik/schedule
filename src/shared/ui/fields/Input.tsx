import React from "react"

interface Props {
    className?: string
    placeholder?: string
    type?: string
    name?: string
    icon?: React.ReactNode
    children?: React.ReactNode
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const Input = (
    { className, placeholder, type, name, icon, children, onFocus, onBlur, ...rest }: Props
) => {
    return <label className={`flex items-center gap-2 px-4 py-1 h-10 rounded-xl bg-island cursor-text ${className}`}>
        { icon }
        <input className="size-full text-xl text-element placeholder:text-element-sub"
               placeholder={placeholder}
               type={type}
               name={name}
               onFocus={onFocus}
               onBlur={onBlur}
               {...rest}
        />
        { children }
    </label>
}