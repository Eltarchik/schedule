import { UserMeta, UserMetaCard } from "@/entities/user"
import { UserRole } from "@/entities/user/model/types"
import { UserFieldCard } from "@/entities/user/ui/UserFieldCard"
import { DefaultHeader } from "@/widgets/default-header"

const mockUserMeta : UserMeta = {
    id: "1",
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
    return (
        <div className="flex flex-col items-center gap-4 w-full h-full overflow-hidden">
            <DefaultHeader>Профиль</DefaultHeader>
            <div className="flex flex-col gap-4 w-full lg:w-220 h-full">
                <UserMetaCard meta={mockUserMeta} />
                <div className="flex flex-col gap-2">
                    { mockUserInfo.map(info =>
                        <UserFieldCard key={info.name} name={info.name} value={info.value} />
                    )}
                </div>
            </div>
        </div>
    )
}