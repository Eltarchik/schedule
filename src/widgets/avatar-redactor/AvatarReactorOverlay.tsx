'use client'

import { createPortal } from "react-dom"
import { Button } from "@/shared/ui/buttons"
import { Text } from "@/shared/ui/text"
import Image from "next/image"

interface Props {
    showed: boolean
    onClose?: () => void
}

export const AvatarReactorOverlay = (
    { showed, onClose }: Props
) => {
    if (!showed) return null

    return createPortal(
        <div className="absolute flex justify-center items-center left-0 right-0 top-0 bottom-0 bg-space/40">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-80 h-100 bg-island">
                    <Image className="object-cover"
                           src="/test.png"
                           alt="avatar"
                           width={320}
                           height={320}
                    />
                </div>
                <div className="flex gap-2 w-full">
                    <Button className="w-full"
                            onClick={onClose}
                    >
                        <Text bold>Отмена</Text>
                    </Button>
                    <Button className="w-full enabled:bg-accent">
                        <Text bold>Сохранить</Text>
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}