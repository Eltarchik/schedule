import { useEffect } from "react"
import { useScheduleDayStore } from "@/features/select-day"
import { ScheduleDaySessionStorage } from "@/features/select-day/lib/scheduleDaySessionStorage"

export const useInitScheduleDay = () => {
    const setDay = useScheduleDayStore(state => state.setDay)

    useEffect(() => {
        const stored = ScheduleDaySessionStorage.load()
        if (stored) setDay(stored)
    }, [setDay])
}