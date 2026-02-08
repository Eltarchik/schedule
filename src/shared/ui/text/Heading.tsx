import React, { memo } from "react"

interface Props {
    size?: "small" | "medium" | "large"
    className?: string
    style?: object
    children?: React.ReactNode
}

export const Heading = memo(({
    size = "medium",
    className = "",
    style = {},
    children,

}: Props) => {
    const commonStiles = "text-heading text-element"

    if (size === "small") {
        return <h1 className={`${commonStiles} text-[20px]/5 ${className}`} style={style}>
            {children}
        </h1>
    }

    if (size === "medium") {
        return <h2 className={`${commonStiles} text-[24px]/6 ${className}`} style={style}>
            {children}
        </h2>
    }

    if (size === "large") {
        return <h3 className={`${commonStiles} text-[32px]/10 ${className}`} style={style}>
            {children}
        </h3>
    }
})
Heading.displayName = "Heading"