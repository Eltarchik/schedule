import React from "react"

interface Props {
    small?: boolean
    bold?: boolean
    children?: React.ReactNode
}

export const Text = ({
    small = false,
    bold = false,
    children,

}: Props) => {
    const size = small ? "" : ""
    const width = bold ? "" : ""

    return <p className={`${size} ${width}`}>
        {children}
    </p>
}