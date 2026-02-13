'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { Text } from "@/shared/ui/text"
import { Input } from "@/shared/ui/fields/Input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { AuthAPI } from "@/shared/api/authAPI"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Routes } from "@/shared/config/routes"
import { AccessToken } from "@/shared/api/authToken"

interface FormFields {
    email: string
    password: string
}

export const LoginForm = () => {
    const { register, handleSubmit, formState } = useForm<FormFields>({
        mode: "onBlur"
    })

    const [ passwordShowed, setPasswordShowed ] = useState(false)
    const router = useRouter()

    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const emailError = formState.errors.email?.message

    const loginMutation = useMutation({
        mutationFn: AuthAPI.login,
        onSuccess: (data) => {
            AccessToken.save(data.accessToken)
            router.push(Routes.HOME)
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
               {...register("email", {
                   required: true,
                   pattern: {
                       value: emailValidator,
                       message: "Некорректная почта"
                   }
               })}
        />
        <Input placeholder="Пароль"
               {...register("password", {
                   required: true
               })}
            type={passwordShowed ? "text" : "password"}
        >
            <button onClick={() => setPasswordShowed(prev => !prev)}>
                { passwordShowed
                    ? <Eye color="var(--element-sub)" />
                    : <EyeOff color="var(--element-sub)" />
                }
            </button>
        </Input>
        <div className="flex flex-col">
            <Text small className={`
                            text-error ${emailError ? "opacity-100" : "opacity-0"} 
                            transition-opacity duration-100 ease-in
                        `}
            >
                Некорректная почта
            </Text>
        </div>
        <button className="flex justify-center items-center h-10 rounded-xl bg-accent
                    disabled:bg-island group enabled:cursor-pointer transition-colors duration-200 ease-in"
                type="submit"
                disabled={!formState.isValid}
        >
            <Text bold className="group-disabled:text-element-disabled transition-colors duration-200 ease-in">
                Войти
            </Text>
        </button>
    </form>
}