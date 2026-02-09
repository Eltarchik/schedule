import { DayNote } from "@/entities/calendar-day/model/types"
import React, { MouseEventHandler, useRef, useState } from "react"
import { Pencil, SmilePlus, Trash } from "lucide-react"
import { Text } from "@/shared/ui/text"


interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children?: React.ReactNode,
    className?: string
}

const SquireButton = (
    { onClick, children, className }: ButtonProps
) => {
    return <button className={`
                        flex items-center justify-center min-h-12 min-w-12 
                        rounded-2xl bg-island ${className}
                   `}
            onClick={onClick}
    >
        { children }
    </button>
}

interface Props {
    note: DayNote
    opened?: boolean
    onClick?: () => void
}

export const DayNoteCard= (
    { note, opened = true, onClick }: Props
) => {
    const fieldRef = useRef<HTMLTextAreaElement | null>(null)
    const [noteText, setNoteText] = useState(note.content)

    const [editMode, setEditMode] = useState(false)

    const cardHeight = opened ? "min-h-40" : "min-h-16"
    const fieldStyle = opened ?  "opacity-100" : "opacity-0 pointer-events-none"
    const demoTextOpacity = opened ?  "opacity-0" : "opacity-100"

    return <div className={`
                    flex gap-2 w-full ${cardHeight} ${!opened} overflow-hidden \
                    transition-[min-height] duration-200 ease-in \
                `}
                onClick={onClick}
    >
        <div className="relative flex p-4 w-full rounded-2xl bg-island">
            <Text className={`absolute truncate w-[calc(100%-24px)] ${demoTextOpacity} transition-opacity duration-200 ease-in`}>
                {noteText}
            </Text>
            <textarea
                className={`resize-none text-xl w-full no-scrollbar ${fieldStyle} transition-opacity duration-200 ease-in`}
                ref={fieldRef}
                value={noteText}
                disabled={!editMode || !opened}
                onChange={event => setNoteText(event.target.value)}
            />
        </div>
        <div className="flex flex-col gap-2">
            <SquireButton className={`${opened ? "" : "min-h-16"} transition-[min-height] duration-200 ease-in`}
                          onClick={event => event.stopPropagation()}
            >
                <SmilePlus/>
            </SquireButton>
            <SquireButton onClick={() => setEditMode(true)}>
                <Pencil/>
            </SquireButton>
            <SquireButton>
                <Trash/>
            </SquireButton>
        </div>
    </div>
}