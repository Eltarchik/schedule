import { UserMeta, userRoleToString } from "@/entities/user"
import Image from "next/image"
import { Heading, Text } from "@/shared/ui/text"


interface Props {
    meta: UserMeta
}

export const UserMetaCard = ({
    meta
}: Props) => {
    const role = userRoleToString(meta.role)

    return <div className="flex items-center gap-5">
        <Image className="size-20 rounded-full"
               src={meta.avatarURL}
               alt={meta.name}
               width={80}
               height={80}
        />

        <div className="flex flex-col gap-1">
            <Heading size="small">{ meta.name }</Heading>
            <Text bold className="text-element-sub ">{ role }</Text>
        </div>
    </div>
}