'use client'

import "@/application/main.css"
import React from "react"
import { robotoFlex } from "@/shared/config/fonts"
import { BreakpointProvider } from "@/shared/lib/adaptive/BreakpointProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface Props {
    children: React.ReactNode
}

const queryClient = new QueryClient()

export default function RootLayout(
    { children }: Props
) {
  return (
    <html lang="ru" className={robotoFlex.variable}>
      <body className="flex p-4 h-screen overflow-hidden">
      <QueryClientProvider client={queryClient}>
          <BreakpointProvider>
              {children}
          </BreakpointProvider>
          <ReactQueryDevtools />
      </QueryClientProvider>
      </body>
    </html>
  )
}
