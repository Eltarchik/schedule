import { create } from "zustand/react"
import { createJSONStorage, persist } from "zustand/middleware"

interface ScheduleDayStore {
    day?: Date
    setDay: (day: Date) => void
    nextDay: () => void
    prevDay: () => void
}

export const useScheduleDayStore = create<ScheduleDayStore>()(
    persist((set, get) => ({
        day: undefined,

        setDay: (day) => {
            set({ day })
        },

        prevDay: () => {
            const state = get().day
            if(state === undefined) return

            const day = new Date(state.getTime())
            day.setDate(day.getDate() - 1)
            set({ day: day })
        },

        nextDay: () => {
            const state = get().day
            if(state === undefined) return

            const day = new Date(state.getTime())
            day.setDate(day.getDate() + 1)
            set({ day: day })
        },
    }), {
        name: "schedule-day",
        storage: createJSONStorage(() => sessionStorage),
        merge: (persistedState, currentState) => {
            return {
                ...currentState,
                day: (persistedState as { day: string })?.day
                    ? new Date((persistedState as { day: string }).day)
                    : new Date()
            }
        }
    })
)