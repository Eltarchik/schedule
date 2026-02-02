import { Lesson } from "@/entities/lesson"
import { Slot } from "@/entities/slot"

export interface DaySchedule {
    slots: Slot[]
    lessons: Lesson[]
}