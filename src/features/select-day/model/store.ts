import { create } from "zustand/react"

interface SelectDayStore {
    day: Date
    setDay: (day: Date) => void
    nextDay: () => void
    prevDay: () => void
}

export const useSelectDayStore = create<SelectDayStore>((set, get) => ({
    day: new Date(),

    setDay: (day) => {
        set({ day })
    },

    prevDay: () => {
        const day = new Date(get().day.getTime())
        day.setDate(day.getDate() - 1)
        set({ day: day })
    },

    nextDay: () => {
        const day = new Date(get().day.getTime())
        day.setDate(day.getDate() + 1)
        set({ day: day })
    },
}))