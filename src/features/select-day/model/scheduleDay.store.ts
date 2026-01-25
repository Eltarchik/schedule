import { create } from "zustand/react"

interface ScheduleDayStore {
    day?: Date
    setDay: (day: Date) => void
    nextDay: () => void
    prevDay: () => void
}

export const useScheduleDayStore = create<ScheduleDayStore>((set, get) => ({
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
}))