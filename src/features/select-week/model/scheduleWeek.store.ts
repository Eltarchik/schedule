import { create } from "zustand/react"
import { createJSONStorage, persist } from "zustand/middleware"

interface ScheduleWeekStore {
    weekStart?: Date
    setWeekStart: (day: Date) => void
    nextWeek: () => void
    prevWeek: () => void
}

const getWeekStartWithOffset = (day: Date, weekOffset = 0) => {
    const weekday = day.getDay()
    const offset = weekday === 0 ? 6 : weekday - 1
    return new Date(day.getFullYear(), day.getMonth(), day.getDate() - offset + weekOffset * 7)
}

export const useScheduleWeekStore = create<ScheduleWeekStore>()(
    persist((set, get) => ({
        weekStart: undefined,

        setWeekStart: (day) => {
            const weekStart = getWeekStartWithOffset(day)

            set({ weekStart })
        },

        prevWeek: () => {
            const state = get().weekStart
            if(state === undefined) return

            const weekStart = getWeekStartWithOffset(state, -1)

            set({ weekStart })
        },

        nextWeek: () => {
            const state = get().weekStart
            if(state === undefined) return

            const weekStart = getWeekStartWithOffset(state, 1)

            set({ weekStart })
        },
    }), {
        name: "schedule-week",
        storage: createJSONStorage(() => sessionStorage),
        merge: (persistedState, currentState) => {
            return {
                ...currentState,
                weekStart: getWeekStartWithOffset(
                    (persistedState as { weekStart: string })?.weekStart
                        ? new Date((persistedState as { weekStart: string }).weekStart)
                        : new Date()
                )
            }
        }
    })
)