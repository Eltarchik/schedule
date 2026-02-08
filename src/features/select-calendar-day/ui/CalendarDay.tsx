import { CalendarDayData } from "@/features/select-calendar-day/model/types"
import { Text } from "@/shared/ui/text"
import Image from "next/image"
import { useCalendarDayStore } from "@/features/select-calendar-day/model/calendarDay.store"
import { memo } from "react"


interface Props {
    day: CalendarDayData
    selected?: boolean
}

export const CalendarDay = memo((
    { day, selected = false }: Props
) => {
    const selectDay = useCalendarDayStore(state => state.setDay)

    const bgColor = selected && !day.isDisabled
        ? "bg-accent"
        : ""
    let textColor = ""

    if (day.isDisabled) textColor = "text-element-disabled"
    else if (day.isHoliday) textColor = "text-element-sub"
    else if (day.isWeekend) textColor = "text-accent"

    return <button className={`flex flex-col items-center gap-1 pt-2 w-full h-13 rounded-lg ${bgColor}`}
                   disabled={day.isDisabled}
                   onClick={() => selectDay(day.date)}
    >
        <Text small className={textColor}>{ day.date.getDate() }</Text>
        { day.note?.icon &&
            <Image src={day.note.icon} alt="note-icon" width={16} height={16}/>
        }
    </button>
})
CalendarDay.displayName = "CalendarDay"