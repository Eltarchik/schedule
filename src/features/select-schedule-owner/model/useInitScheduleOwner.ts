import { useEffect } from "react"
import { useScheduleOwnerStore } from "@/features/select-schedule-owner"

export const useInitScheduleOwner = () => {
    const owner = useScheduleOwnerStore(state => state.owner)
    const setOwner = useScheduleOwnerStore(state => state.setOwner)

    useEffect(() => {
        if (owner) return

        // todo Add API Request
    }, [owner, setOwner])
}