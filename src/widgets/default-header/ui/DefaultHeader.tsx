'use client'

import { Heading } from "@/shared/ui/text"
import { BurgerMenu } from "@/widgets/burger-menu"
import { memo } from "react"

interface Props {
    children?: React.ReactNode
}

export const DefaultHeader = memo((
    { children }: Props
) => {
    return <div className="flex flex-col gap-4 w-full">
        <div className="flex w-full items-center justify-between gap-4">
            <Heading size="large">{children}</Heading>
            <BurgerMenu />
        </div>
        <div className="w-full h-0.25 bg-island"/>
    </div>
})
DefaultHeader.displayName = "DefaultHeader"