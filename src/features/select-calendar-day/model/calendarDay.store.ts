import { create } from "zustand/react"
import { createJSONStorage, persist } from "zustand/middleware"

interface CalendarDayStore {
    day?: Date
    setDay: (day: Date) => void
}

export const useCalendarDayStore = create<CalendarDayStore>()(
    persist(set => ({
        day: undefined,

        setDay: (day) => {
            set({ day })
        }

    }), {
        name: "calendar-day",
        storage: createJSONStorage(() => sessionStorage),
        merge: (persistedState, currentState) => {
            return {
                ...currentState,
                day: (persistedState as { day: string }).day
                    ? new Date((persistedState as { day: string }).day)
                    : new Date()
            }
        }
    })
)