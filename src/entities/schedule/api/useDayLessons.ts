import { Lesson } from "@/entities/lesson"
import { getDayLessons } from "@/entities/schedule/api/getDayLessons"


export const useDayLessons = (): Lesson[] => {
    return getDayLessons() // todo
}