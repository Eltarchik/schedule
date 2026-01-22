import "@/application/main.css"
import React from "react"
import { robotoFlex } from "@/shared/config/fonts"

interface Props {
    children: React.ReactNode
}

export default function RootLayout(
    { children }: Props
) {
  return (
    <html lang="ru" className={robotoFlex.variable}>
      <body className="flex p-4">
        {children}
      </body>
    </html>
  )
}
