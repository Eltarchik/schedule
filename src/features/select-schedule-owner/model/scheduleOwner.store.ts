import { create } from "zustand/react"
import { ScheduleOwner } from "@/features/select-schedule-owner/model/types"

interface ScheduleOwnerStore {
    owner?: ScheduleOwner
    setOwner: (day: ScheduleOwner) => void
}

export const useScheduleOwnerStore = create<ScheduleOwnerStore>((set) => ({
    owner: undefined,

    setOwner: (owner) => {
        set({ owner })
    },
}))