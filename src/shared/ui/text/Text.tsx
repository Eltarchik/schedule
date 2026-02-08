import React, { memo } from "react"

interface Props {
    small?: boolean
    bold?: boolean
    className?: string
    children?: React.ReactNode
}

export const Text = memo(({
    small = false,
    bold = false,
    className = "",
    children,

}: Props) => {
    const size = small ? "text-[16px]" : "text-xl"
    const width = bold ? "font-bold" : ""

    return <p className={`${size} ${width} ${className}`}>
        {children}
    </p>
})
Text.displayName = "Text"