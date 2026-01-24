import React from "react"

interface Props {
    size?: "small" | "medium" | "large"
    className?: string
    children?: React.ReactNode
}

export const Header = ({
    size = "medium",
    className = "",
    children,

}: Props) => {
    let textSize = ""

    switch (size) {
        case "small":
            textSize = "text-[20px]/5"
            break
        case "medium":
            textSize = "text-[24px]/6"
            break
        case "large":
            textSize = "text-[32px]/10"
    }

    return <header className={`text-heading text-element ${textSize} ${className}`}>
        {children}
    </header>
}