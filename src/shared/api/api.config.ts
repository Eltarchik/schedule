import axios, { CreateAxiosDefaults } from "axios"

const options: CreateAxiosDefaults = {
    baseURL: "http://localhost:4242/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
}

export const axiosPrivate = axios.create(options)