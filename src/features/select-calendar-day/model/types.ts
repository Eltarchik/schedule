export interface DayNote {
    icon: string
    content: string
}

export interface CalendarDayData {
    date: Date
    isHoliday: boolean
    isWeekend: boolean
    isDisabled: boolean
    note?: DayNote
}