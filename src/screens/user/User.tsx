'use client'

import { UserMetaCard } from "@/entities/user"
import { DefaultHeader } from "@/widgets/default-header"
import { Text } from "@/shared/ui/text"
import { Button } from "@/shared/ui/buttons"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AuthAPI } from "@/shared/api/authAPI"
import { Routes } from "@/shared/config/routes"
import { Tokens } from "@/shared/api/authToken"
import Cookies from "js-cookie"
import { AvatarCropper, AvatarSelector } from "@/features/set-avatar"
import { useState } from "react"
import { CropData } from "@/features/set-avatar/model/types"
import { UserAPI } from "@/entities/user/api/userAPI"
import { UserInfoFields } from "@/widgets/user-info-fields/ui/UserInfoFields"

export const User = () => {
    const [ avatarRedactorShowed, setAvatarRedactorShowed ] = useState(false)
    const [ avatar, setAvatar ] = useState<File | undefined>(undefined)

    const router = useRouter()

    const logoutMutation = useMutation({
        mutationFn: AuthAPI.logout,
        onSuccess: () => {
            Cookies.remove(Tokens.ACCESS)
            router.push(Routes.LOGIN)
        }
    })

    const avatarMutation = useMutation({
        mutationFn: UserAPI.avatar,
        onError: () => {
            console.log("avatar loading error") // todo
        }
    })

    const onAvatarSelected = (ava: File) => {
        setAvatar(ava)
        setAvatarRedactorShowed(true)
    }

    const onCropperClose = () => {
        setAvatarRedactorShowed(false)
        setAvatar(undefined)
    }

    const onCroppingConfirm = (data: CropData, avatar: File) => {
        onCropperClose()

        const formData = new FormData()
        formData.append("avatar", avatar)
        formData.append("cropData", JSON.stringify(data))

        avatarMutation.mutate(formData)
    }

    return <div className="flex flex-col items-center gap-4 w-full h-full overflow-hidden">
        <AvatarCropper avatar={avatar}
                       showed={avatarRedactorShowed}
                       onClose={onCropperClose}
                       onConfirm={onCroppingConfirm}
        />
        <DefaultHeader>Профиль</DefaultHeader>
        <div className="flex flex-col gap-4 w-full lg:w-220 h-full">
            <UserMetaCard />
            <UserInfoFields />
            <div className="flex gap-4 mt-auto">
                <AvatarSelector onAvatarSelected={onAvatarSelected} />
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