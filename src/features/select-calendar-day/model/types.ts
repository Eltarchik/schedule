import { DayNote } from "@/entities/calendar-day/model/types"

export interface CalendarDayData {
    date: Date
    isHoliday: boolean
    isWeekend: boolean
    isDisabled: boolean
    note?: DayNote
}