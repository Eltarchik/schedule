import { DayNote } from "@/entities/calendar-day/model/types"
import React, { RefAttributes, useRef, useState } from "react"
import { LucideProps, Pencil, SmilePlus, Trash } from "lucide-react"


interface ButtonProps {
    onClick?: () => void,
    children?: React.ReactNode,
}

const SquireButton = (
    { onClick, children }: ButtonProps
) => {
    return <button className="flex items-center justify-center size-12 rounded-2xl bg-island"
            onClick={onClick}
    >
        { children }
    </button>
}

interface Props {
    note: DayNote
    opened?: boolean
}

export const DayNoteCard= (
    { note, opened = true }: Props
) => {
    const fieldRef = useRef<HTMLTextAreaElement | null>(null)
    const [noteText, setNoteText] = useState(note.content)

    const [editMode, setEditMode] = useState(false)

    return <div className="flex gap-2 w-full">
        <div className="flex p-4 w-full rounded-2xl bg-island">
            <textarea className="resize-none text-xl w-full"
                      ref={fieldRef}
                      value={noteText}
                      disabled={!editMode}
            />
        </div>
        <div className="flex flex-col justify-end gap-2">
            <SquireButton>
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