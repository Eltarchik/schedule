import { Heading } from "@/shared/ui/text"
import Link from "next/link"
import { Routes } from "@/shared/config/routes"
import { UserMeta, UserMetaCard } from "@/entities/user"
import { UserRole } from "@/entities/user/model/types"
import { X } from "lucide-react"

const mockUserMeta : UserMeta = {
    id: "1",
    name: "Носевич Илья",
    role: UserRole.STUDENT,
    avatarURL: "https://media.discordapp.net/attachments/1042432702135144530/1465100539426504734/photo_2026-01-08_18-55-35.png?ex=6977e0b4&is=69768f34&hm=8d04cb7e563624c87b2be4ec4696733139e7d2051267a5a1c19d305f5994ea9f&=&format=webp&quality=lossless&width=329&height=438",
}

export const User = () => {
    return (
        <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
            <div className="flex w-full items-center justify-between gap-4">
                <Heading size="large">Профиль</Heading>
                <Link href={Routes.HOME} className="flex justify-center items-center w-10 h-10 rounded-full bg-island">
                    <X />
                </Link>
            </div>
            <div className="w-full h-0.25 bg-island" />
            <UserMetaCard meta={mockUserMeta} />
        </div>
    )
}