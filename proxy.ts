import { NextRequest, NextResponse, ProxyConfig } from "next/server"
import { Routes } from "@/shared/config/routes"
import { Tokens } from "@/shared/api/authToken"

export async function proxy(request: NextRequest) {
    const { nextUrl, cookies } = request

    const { pathname } = nextUrl
    const accessToken = cookies.get(Tokens.ACCESS)
    const isLoginPage = pathname.startsWith(Routes.LOGIN)

    if (
        pathname.startsWith("/_next")
        || pathname.startsWith("/api")
        || pathname.startsWith("/favicon.ico")
        || pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|css|js)$/)
    ) {
        return NextResponse.next()
    }

    if (!accessToken && !isLoginPage) {
        return NextResponse.redirect(new URL(Routes.LOGIN, request.url))
    }

    if (accessToken && isLoginPage) {
        return NextResponse.redirect(new URL(Routes.HOME, request.url))
    }

    return NextResponse.next()
}

export const config: ProxyConfig = {
    matcher: ["/((?!_next|favicon.ico|api).*)"]
}