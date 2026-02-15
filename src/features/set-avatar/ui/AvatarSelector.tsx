import { Text } from "@/shared/ui/text"
import { Button } from "@/shared/ui/buttons"
import { ChangeEvent, useRef } from "react"
import { validateAvatar } from "@/features/set-avatar/lib/constraint"

interface Props {
    onAvatarSelected?: (avatar: File) => void
}

export const AvatarSelector = ({
    onAvatarSelected
}: Props) => {
    const avatarInputRef = useRef<HTMLInputElement>(null)

    const onAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const avatar = event.target.files?.[0]
        if (!avatar || !validateAvatar(avatar)) {
            // todo add error msg
            return
        }

        onAvatarSelected?.(avatar)
        event.target.value = ""
    }

    return <>
        <Button className="w-full"
                onClick={() => avatarInputRef?.current?.click()}
        >
            <Text bold>Выбрать аву</Text>
        </Button>

        <input className="hidden"
               type="file"
               accept="image/*"
               ref={avatarInputRef}
               onChange={onAvatarChange}
        />
    </>
}