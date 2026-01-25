import { useEffect } from "react"
import { useScheduleOwnerStore } from "@/features/select-schedule-owner"
import { ScheduleOwnerLocalStorage } from "@/features/select-schedule-owner/lib/scheduleOwnerLacalStorage"

export const useInitScheduleOwner = () => {
    const setOwner = useScheduleOwnerStore(state => state.setOwner)

    useEffect(() => {
        const stored = ScheduleOwnerLocalStorage.load()
        if (stored) {
            setOwner(stored)
            return
        }


        // todo Add API Request
    }, [setOwner])
}