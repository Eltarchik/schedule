'use client'

import { useEffect, useRef, useState } from "react"
import { Text } from "@/shared/ui/text"
import { ScheduleOwner } from "@/features/select-schedule-owner/model/types"
import { useScheduleOwnerStore } from "@/features/select-schedule-owner"
import { OwnersQuery } from "@/features/select-schedule-owner/api/useSearchOwners"
import { useDebounce } from "@/shared/lib/hooks/useDebounds"

export const ScheduleOwnerSelector = () => {
    const selectedScheduleOwner = useScheduleOwnerStore(state => state.owner)
    const setScheduleOwner = useScheduleOwnerStore(state => state.setOwner)

    const [ inputText, setInputText ] = useState<string | undefined>(undefined) // todo add default value from user info
    const [ focused, setFocused ] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    const searchText = useDebounce(inputText ?? "")

    const { data: displayedScheduleOwners } = OwnersQuery.searchOwners(focused, searchText)

    const onScheduleOwnerClick = (owner: ScheduleOwner) => {
        ref.current?.blur()
        setScheduleOwner(owner)
        setInputText(owner.name)
    }

    useEffect(() => {
        if (inputText !== undefined) return

        const loadText = () => setInputText(selectedScheduleOwner?.name ?? "")
        loadText()
    }, [inputText, selectedScheduleOwner])

    const onInputFocus = () => {
        setInputText(selectedScheduleOwner?.name ?? "")
        setFocused(true)
    }

    const onInputBlur = () => {
        setFocused(false)
    }

    return <div className="relative flex flex-col">
        <label className="flex items-center justify-center w-full h-10 px-4 rounded-xl bg-island">
            <input className="text-element text-[20px] font-bold text-center w-full"
                   placeholder="Найти"
                   id="group-or-teacher"
                   name="group-or-teacher"
                   ref={ref}
                   value={focused ? inputText : selectedScheduleOwner?.name ?? " "}
                   onChange={(e) => setInputText(e.target.value)}
                   onFocus={onInputFocus}
                   onBlur={onInputBlur}
            />
        </label>

        { focused &&
            <div className="absolute z-20 flex flex-col p-2 w-full top-full translate-y-2 rounded-xl
                            shadow-space/40 shadow-xl bg-island"
                 onMouseDown={event => event.preventDefault()}
            >
                { displayedScheduleOwners?.map(owner => {
                    const selected =
                        owner.id === selectedScheduleOwner?.id
                        && owner.type === selectedScheduleOwner.type
                    const bgColor = selected ? "bg-accent" : ""

                    return <button className={`flex justify-center items-center w-full h-8 rounded-lg ${bgColor}`}
                                   key={`${owner.type}-${owner.id}`}
                                   onMouseDown={event => event.preventDefault()}
                                   onClick={() => onScheduleOwnerClick(owner)}
                    >
                        <Text small>{owner.name}</Text>
                    </button>
                })}

                { !displayedScheduleOwners?.length &&
                    <Text className="text-element-sub self-center">Ничего не найдено</Text>
                }
            </div>
        }
    </div>
}