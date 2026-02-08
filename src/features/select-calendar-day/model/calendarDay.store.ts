import { create } from "zustand/react"

interface CalendarDayStore {
    day?: Date
    setDay: (day: Date) => void
}

export const useCalendarDayStore = create<CalendarDayStore>(set => ({
        day: new Date(),

        setDay: (day) => {
            set({ day })
        }
    })
)