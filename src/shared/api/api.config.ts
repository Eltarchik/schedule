import axios, { CreateAxiosDefaults } from "axios"
import { AccessToken } from "@/shared/api/authToken"
import { errorCatch } from "@/shared/api/error"
import { AuthAPI } from "@/shared/api/authAPI"

const options: CreateAxiosDefaults = {
    baseURL: "http://localhost:4242/api",
    withCredentials: true,
}

export const axiosCommon = axios.create(options)
export const axiosTeacher = axios.create(options)

axiosCommon.interceptors.request.use(config => {
    const accessToken = AccessToken.get()

    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

axiosCommon.interceptors.response.use(
    config => config,
    async error => {
        const request = error.config

        if (
            (error?.response?.status === 401
            || errorCatch(error) === "jwt expired"
            || errorCatch(error) === "jwt must be provided")
            && error.config
            && !error.config._isRetry
        ) {
            request._isRetry = true
            try {
                await AuthAPI.refresh()
                return await axiosTeacher.request(request)
            } catch (error) {
                if (errorCatch(error) === "jwt expired") AccessToken.remove()
            }
        }

        throw error
    }
)