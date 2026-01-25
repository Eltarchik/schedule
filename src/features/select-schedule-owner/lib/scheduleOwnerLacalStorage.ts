import { ScheduleOwner } from "@/features/select-schedule-owner/model/types"
import { loadFromLocalStorage, saveToLocalStorage } from "@/shared/lib/storage/storageInteractions"


export class ScheduleOwnerLocalStorage {
    private static KEY = 'schedule-owner'

    static load()  {
        return loadFromLocalStorage<ScheduleOwner>(this.KEY)
    }

    static save(owner: ScheduleOwner) {
        saveToLocalStorage(this.KEY, owner)
    }
}