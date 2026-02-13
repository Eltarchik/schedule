import { axiosCommon } from "@/shared/api/api.config"
import { AccessToken } from "@/shared/api/authToken"

export interface AuthForm {
    email: string
    password: string
}

interface AuthResponse {
    accessToken: string
}

export class AuthAPI {
    private static BASE_URL = "/auth"

    static login = async (data: AuthForm) => {
        const response = await axiosCommon.post<AuthResponse>(
            this.BASE_URL + "/login",
            data
        )

        const { accessToken } = response.data
        if (accessToken) AccessToken.save(accessToken)

        return response.data
    }

    static register = async (data: AuthForm) => {
        const response = await axiosCommon.post<AuthResponse>(
            this.BASE_URL + "/register",
            data
        )

        const { accessToken } = response.data
        if (accessToken) AccessToken.save(accessToken)

        return response.data
    }

    static logout = async () => {
        const response = await axiosCommon.post(
            this.BASE_URL + "/logout"
        )

        if (response.data) AccessToken.remove()

        return response.data
    }

    static refresh = async () => {
        const response = await axiosCommon.post<AuthResponse>(
            this.BASE_URL + "/refresh"
        )

        const { accessToken } = response.data
        if (accessToken) AccessToken.save(accessToken)

        return response.data
    }
}