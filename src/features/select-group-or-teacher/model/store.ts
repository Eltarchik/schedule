import { create } from "zustand/react"
import { ScheduleOwner } from "@/features/select-group-or-teacher/model/types"

interface SelectScheduleOwnerStore {
    owner?: ScheduleOwner
    setOwner: (day: ScheduleOwner) => void
}

export const useSelectScheduleOwnerStore = create<SelectScheduleOwnerStore>((set) => ({
    owner: undefined,

    setOwner: (owner) => {
        set({ owner })
    },
}))