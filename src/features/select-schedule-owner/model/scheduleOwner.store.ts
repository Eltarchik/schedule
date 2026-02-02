import { create } from "zustand/react"
import { ScheduleOwner } from "@/features/select-schedule-owner/model/types"
import { persist } from "zustand/middleware"

interface ScheduleOwnerStore {
    owner?: ScheduleOwner
    setOwner: (day: ScheduleOwner) => void
}

export const useScheduleOwnerStore = create<ScheduleOwnerStore>()(
    persist(set => ({
        owner: undefined,

        setOwner: (owner) => {
            set({ owner })
        },
    }), {
        name: "schedule-owner"
    })
)