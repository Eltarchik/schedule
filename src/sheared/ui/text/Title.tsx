import React from "react"

interface Props {
    size: "small" | "medium" | "large"
    children: React.ReactNode
}

export const Title = ({
    size = "medium",
    children,

}: Props) => {
    const font = ""

    switch (size) {
        case "small":
            return <header className={`${font}`}>
                {children}
            </header>
    }
}