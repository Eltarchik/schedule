import React from "react"

interface Props {
    size?: "small" | "medium" | "large"
    color?: string
    children?: React.ReactNode
}

interface Style {
    color: string
}

export const Header = ({
    size = "medium",
    color = "element",
    children,

}: Props) => {
    let textSize = ""
    const style: Style = {
        color,
    }

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

    return <header className={`text-heading ${textSize}`} style={style}>
        {children}
    </header>
}