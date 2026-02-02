'use client'

import { createContext, ReactNode, useEffect, useState } from "react"
import { Breakpoint, MOBILE_WIDTH, TABLET } from "@/shared/lib/adaptive/breakpoints"

export const BreakpointContext = createContext(Breakpoint.DESKTOP)

interface Props {
    children: ReactNode
}

export const BreakpointProvider = ({ children }: Props) => {
    const [breakpoint, setBreakpoint] = useState(Breakpoint.DESKTOP)

    useEffect(() => {
        const calc = () => {
            const width = window.innerWidth
            if (width < MOBILE_WIDTH) return Breakpoint.MOBILE
            if (width < TABLET) return Breakpoint.TABLET
            return Breakpoint.DESKTOP
        }

        const update = () => setBreakpoint(calc())
        update()

        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return (
        <BreakpointContext.Provider value={breakpoint}>
            { children }
        </BreakpointContext.Provider>
    )
}