import React from "react"

interface Props {
    small?: boolean
    bold?: boolean
    color?: string
    children?: React.ReactNode
}

interface Style {
    color: string
}

export const Text = ({
    small = false,
    bold = false,
    color = "var(--element)",
    children,

}: Props) => {
    const style: Style = {
        color,
    }

    const size = small ? "text-[16px]" : "text-[20px]"
    const width = bold ? "font-bold" : ""

    return <p className={`${size} ${width}`} style={style}>
        {children}
    </p>
}