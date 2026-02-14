'use client'

import { UserMeta, UserMetaCard } from "@/entities/user"
import { UserRole } from "@/entities/user/model/types"
import { UserFieldCard } from "@/entities/user/ui/UserFieldCard"
import { DefaultHeader } from "@/widgets/default-header"
import { Text } from "@/shared/ui/text"
import { Button } from "@/shared/ui/buttons"
import { LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AuthAPI } from "@/shared/api/authAPI"
import { Routes } from "@/shared/config/routes"
import { Tokens } from "@/shared/api/authToken"
import Cookies from "js-cookie"
import { useOverlayShowControl } from "@/shared/lib/hooks/useOverlayShowControl"
import { AvatarReactorOverlay } from "@/widgets/avatar-redactor"
import { useState } from "react"

const mockUserMeta : UserMeta = {
    id: 1,
    name: "Носевич Илья",
    role: UserRole.STUDENT,
    avatarURL: "https://pwimages-a.akamaihd.net/arc/15/d8/15d8d65e395c5809a6cf4a26363ed1001557478083.jpg",
}

interface MockUserField {
    name: string
    value: string
}

const mockUserInfo: MockUserField[] = [
    {
        name: "Класс",
        value: "11е-ИТ",
    },
    {
        name: "Эл. почта",
        value: "ilyanosevitch@yandex.ru",
    },
    {
        name: "Телефон",
        value: "+7 952 618-92-40",
    },
]

export const User = () => {
    const router = useRouter()
    const logoutMutation = useMutation({
        mutationFn: AuthAPI.logout,
        onSuccess: () => {
            Cookies.remove(Tokens.ACCESS)
            router.push(Routes.LOGIN)
        }
    })
    const [ avatarRedactorShowed, setAvatarRedactorShowed ] = useState(false)

    return <div className="flex flex-col items-center gap-4 w-full h-full overflow-hidden">
        <AvatarReactorOverlay showed={avatarRedactorShowed}
                              onClose={() => setAvatarRedactorShowed(false)}
        />
        <DefaultHeader>Профиль</DefaultHeader>
        <div className="flex flex-col gap-4 w-full lg:w-220 h-full">
            <UserMetaCard meta={mockUserMeta} />
            <div className="flex flex-col gap-2">
                { mockUserInfo.map(info =>
                    <UserFieldCard key={info.name} name={info.name} value={info.value} />
                )}
            </div>
            <div className="flex gap-4 mt-auto">
                <Button className="w-full"
                        onClick={() => setAvatarRedactorShowed(true)}
                >
                    <Settings />
                    <Text bold>Настройки</Text>
                </Button>
                <Button className="w-full hover:bg-error"
                        onClick={() => logoutMutation.mutate()}
                >
                    <LogOut />
                    <Text bold>Выйти</Text>
                </Button>
            </div>
        </div>
    </div>
}