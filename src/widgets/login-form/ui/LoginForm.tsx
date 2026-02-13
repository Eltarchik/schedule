'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { Text } from "@/shared/ui/text"
import { Input } from "@/shared/ui/fields/Input"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { AuthAPI } from "@/shared/api/authAPI"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Routes } from "@/shared/config/routes"
import { AccessToken } from "@/shared/api/authToken"
import { Button } from "@/shared/ui/buttons"

interface FormFields {
    email: string
    password: string
}

export const LoginForm = () => {
    const { register, handleSubmit, formState, watch } = useForm<FormFields>({
        mode: "onBlur"
    })

    const [ passwordShowed, setPasswordShowed ] = useState(false)
    const [ badRequest, setBadRequest ] = useState(false)
    const router = useRouter()

    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const emailError = formState.errors.email?.message

    const emailRegister = register("email", {
        required: true,
        pattern: {
            value: emailValidator,
            message: "Некорректная почта"
        }
    })
    const passwordRegister = register("password", {
        required: true
    })

    const loginMutation = useMutation({
        mutationFn: AuthAPI.login,
        onSuccess: (data) => {
            AccessToken.save(data.accessToken)
            router.push(Routes.HOME)
        },
        onError: () => {
            setBadRequest(true)
        }
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        loginMutation.mutate({
            email: data.email,
            password: data.password,
        })
    }

    return <form className="flex flex-col gap-4"
                 onSubmit={handleSubmit(onSubmit)}
    >
        <Input placeholder="Почта"
               className={`${emailError && "error-border"} transition-shadow duration-100 ease-in`}
               {...emailRegister}
               onBlur={event => {
                   emailRegister.onBlur(event)
                   setBadRequest(false)
               }}
        />
        <Input placeholder="Пароль"
               {...passwordRegister}
               type={passwordShowed ? "text" : "password"}
               onBlur={event => {
                   passwordRegister.onBlur(event)
                   setBadRequest(false)
               }}
        >
            <button type="button"
                    onClick={() => setPasswordShowed(prev => !prev)}
            >
                { passwordShowed
                    ? <Eye color="var(--element-sub)" />
                    : <EyeOff color="var(--element-sub)" />
                }
            </button>
        </Input>
        <div className="flex flex-col">
            <Text small className={`
                            text-error ${(emailError || badRequest) ? "opacity-100" : "opacity-0"} 
                            transition-opacity duration-100 ease-in
                        `}
            >
                { badRequest
                    ? "Неверная почта или пароль"
                    : "Некорректная почта"
                }
            </Text>
        </div>
        <Button className="w-full enabled:bg-accent group"
                type="submit"
                disabled={!formState.isValid}
        >
            { !loginMutation.isPending
                ? <Text bold className="group-disabled:text-element-disabled transition-colors duration-200 ease-in">
                    Войти
                </Text>
                : <Text bold className="text-element-sub">
                    Вход...
                </Text>
            }

        </Button>
    </form>
}