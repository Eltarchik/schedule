import { UserProfile, userRoleToString } from "@/entities/user"
import Image from "next/image"
import { Heading, Text } from "@/shared/ui/text"


interface Props {
    meta: UserProfile
}

export const UserMetaCard = ({
    meta
}: Props) => {
    const role = userRoleToString(meta.roles[0])

    const getEmptyAvatarText = () => {
        const names = meta.name.split(" ")
        return names[0].slice(0, 1).toUpperCase() + names[1].slice(0, 1).toUpperCase()
    }

    return <div className="flex items-center gap-5">
        { meta.avatar
            ? <Image className="size-20 rounded-full"
                     src={meta.avatar}
                     alt={meta.name}
                     width={80}
                     height={80}
                     preload
            />
            : <div className="flex justify-center items-center size-20 rounded-full bg-island">
                <Heading size="medium" className="text-element-sub">{ getEmptyAvatarText() }</Heading>
            </div>

        }


        <div className="flex flex-col gap-1">
            <Heading size="small">{ meta.name }</Heading>
            <Text bold className="text-element-sub ">{ role }</Text>
        </div>
    </div>
}