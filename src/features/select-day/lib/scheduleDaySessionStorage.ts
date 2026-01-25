import { loadFromSessionStorage, saveToSessionStorage } from "@/shared/lib/storage/storageInteractions"

export class ScheduleDaySessionStorage {
    private static KEY = 'schedule-day'

    static load()  {
        const dayString = loadFromSessionStorage<string>(this.KEY)
        return dayString ? new Date(dayString) : new Date()
    }

    static save(day: Date) {
        saveToSessionStorage(this.KEY, day)
    }
}