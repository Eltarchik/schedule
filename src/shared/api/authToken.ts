import Cookies from "js-cookie"

export enum Tokens {
    ACCESS = "accessToken",
    REFRESH = "refreshToken",
}

export class AccessToken {
    private static TOKEN = Tokens.ACCESS

    static get() {
        const token = Cookies.get(this.TOKEN)
        return token || null
    }

    static save(token: string) {
        Cookies.set(this.TOKEN, token, {
            domain: "localhost",
            sameSite: "strict",
            expires: 1
        })
    }

    static remove() {
        Cookies.remove(this.TOKEN)
    }
}