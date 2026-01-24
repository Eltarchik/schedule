'use client'

import { useRef, useState } from "react"
import { Text } from "@/shared/ui/text"
import { ScheduleOwner, ScheduleOwnerTypes } from "@/features/select-group-or-teacher/model/types"
import { useSelectScheduleOwnerStore } from "@/features/select-group-or-teacher"

const mockScheduleOwners: ScheduleOwner[] = [
    {
        id: "1",
        name: "11а-ИТ",
        type: ScheduleOwnerTypes.GROUP,
    },
    {
        id: "2",
        name: "11б-ИТ",
        type: ScheduleOwnerTypes.GROUP,
    },
    {
        id: "3",
        name: "Богданов Михаил Рифкатович",
        type: ScheduleOwnerTypes.TEACHER,
    },
    {
        id: "4",
        name: "Карпов Александр Викторович",
        type: ScheduleOwnerTypes.TEACHER,
    },
]

export const GroupOrTeacherSelector = () => {
    const selectedScheduleOwner = useSelectScheduleOwnerStore(state => state.owner)
    const setScheduleOwner = useSelectScheduleOwnerStore(state => state.setOwner)
    const [ displayedScheduleOwners, setDisplayedScheduleOwners ] = useState<ScheduleOwner[]>(mockScheduleOwners) // todo
    const [ searchText, setSearchText ] = useState("") // todo
    const [ focused, setFocused ] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    const onScheduleOwnerClick = (owner: ScheduleOwner) => {
        ref.current?.blur()
        setScheduleOwner(owner)
        setSearchText(owner.name)
    }

    const onInputBlur = () => {
        setSearchText(selectedScheduleOwner?.name ?? "")
        setFocused(false)
    }

    return <div className="relative flex flex-col">
        <label className="flex items-center justify-center w-full h-10 px-4 rounded-xl bg-island">
            <input className="text-element text-[20px] font-bold text-center w-full"
                   placeholder="Найти"
                   id="group-or-teacher"
                   name="group-or-teacher"
                   ref={ref}
                   value={searchText}
                   onChange={(e) => setSearchText(e.target.value)}
                   onFocus={() => setFocused(true)}
                   onBlur={onInputBlur}
            />
        </label>

        { focused &&
            <div className="absolute z-20 flex flex-col p-2 w-full top-full translate-y-2 rounded-xl bg-island"
                 onMouseDown={event => event.preventDefault()}
            >
                {displayedScheduleOwners.map(owner => {
                    const selected = owner.id === selectedScheduleOwner?.id
                    const bgColor = selected ? "bg-accent" : ""

                    return <button className={`flex justify-center items-center w-full h-8 rounded-lg ${bgColor}`}
                                   key={owner.id}
                                   onMouseDown={event => event.preventDefault()}
                                   onClick={() => onScheduleOwnerClick(owner)}
                    >
                        <Text small>{owner.name}</Text>
                    </button>
                })}
            </div>
        }
    </div>
}