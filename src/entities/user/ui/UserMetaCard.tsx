import { UserProfile, userRolesToString } from "@/entities/user"
import Image from "next/image"
import { Heading, Text } from "@/shared/ui/text"
import { useQuery } from "@tanstack/react-query"
import { UserAPI } from "@/entities/user/api/userAPI"
import { UserMetaCardSkeleton } from "@/entities/user/ui/UserMetaCardSkeleton"


interface Props {
    profile: UserProfile
}

export const UserMetaCard = () => {
    const { data: profile, isPending, isError } = useQuery({
        queryKey: ["user", "profile"],
        queryFn: () => UserAPI.profile()
    })

    if (isPending) return <UserMetaCardSkeleton /> // todo add skeleton
    if (!profile || isError) return <div className="flex justify-center mt-10 w-full">
        <Heading size="medium">Ошибка загрузки</Heading>
    </div>

    const role = userRolesToString(profile.roles)

    const getEmptyAvatarText = () => {
        const names = profile.name.split(" ")
        return names[0].slice(0, 1).toUpperCase() + names[1].slice(0, 1).toUpperCase()
    }

    return <div className="flex items-center gap-5">
        { profile.avatar
            ? <Image className="size-20 rounded-full bg-island"
                     src={profile.avatar}
                     alt={profile.name}
                     width={80}
                     height={80}
                     preload
            />
            : <div className="flex justify-center items-center size-20 rounded-full bg-island">
                <Heading size="medium" className="text-element-sub">{ getEmptyAvatarText() }</Heading>
            </div>

        }


        <div className="flex flex-col gap-1">
            <Heading size="small">{ profile.name }</Heading>
            <Text bold className="text-element-sub ">{ role }</Text>
        </div>
    </div>
}