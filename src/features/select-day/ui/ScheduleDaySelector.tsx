'use client'

import { LeftArrowIcon, RightArrowIcon } from "@/shared/ui/icons"
import { Text } from "@/shared/ui/text"
import { useScheduleDayStore } from "@/features/select-day"
import { formatDateToFreeText } from "@/shared/lib/datetime/formatDate"
import { ScheduleWeekCalendar } from "@/features/select-day/ui/SchoolWeekCalendar"
import { useOverlayShowControl } from "@/shared/lib/hooks/useOverlayShowControl"
import { useEffect } from "react"
import { ScheduleDaySessionStorage } from "@/features/select-day/lib/scheduleDaySessionStorage"


export const ScheduleDaySelector = () => {
    const day = useScheduleDayStore(state => state.day)
    const selectPrevDay = useScheduleDayStore(state => state.prevDay)
    const selectNextDay = useScheduleDayStore(state => state.nextDay)

    const dateText = day ? formatDateToFreeText(day) : ""

    const [ calendarOpened, setCalendarOpen, ref ] = useOverlayShowControl()

    useEffect(() => {
        if (!day) return
        ScheduleDaySessionStorage.save(day)
    }, [day])

    return <div className="flex items-center justify-between w-full h-6">
        <button className="flex size-6 items-center justify-center"
                onClick={() => selectPrevDay()}
        >
            <LeftArrowIcon/>
        </button>
        <div className="relative flex justify-center" ref={ref}>
            <button className="flex px-4 items-center justify-center"
                    onClick={() => setCalendarOpen(prev => !prev)}
            >
                <Text bold>{dateText}</Text>
            </button>

            {calendarOpened &&
                <ScheduleWeekCalendar className="inset-y-8"/>
            }
        </div>
        <button className="flex size-6 items-center justify-center"
                onClick={() => selectNextDay()}
        >
            <RightArrowIcon/>
        </button>
    </div>
}