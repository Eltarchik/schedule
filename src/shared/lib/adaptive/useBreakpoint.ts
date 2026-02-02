'use client'

import { useContext } from "react"
import { BreakpointContext } from "@/shared/lib/adaptive/BreakpointProvider"

export const useBreakpoint = () => useContext(BreakpointContext)