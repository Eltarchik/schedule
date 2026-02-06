import { useState } from "react"
import { cloneDateWithOptions } from "@/shared/lib/datetime/dateOperations"

type MonthsSlice = [Date, Date, Date, Date]

const getSlice = (pointerMonth: Date): MonthsSlice => {
    return [
        cloneDateWithOptions(pointerMonth, undefined, pointerMonth.getMonth() - 1, 1),
        cloneDateWithOptions(pointerMonth),
        cloneDateWithOptions(pointerMonth, undefined, pointerMonth.getMonth() + 1, 1),
        cloneDateWithOptions(pointerMonth, undefined, pointerMonth.getMonth() + 2, 1),
    ]
}

export const useCalendarView
    = (defaultMonthStart: Date): [MonthsSlice, () => void, () => void] => {
    const [slice, setSlice] = useState<MonthsSlice>(getSlice(defaultMonthStart))

    const shiftUp = () => {
        setSlice(state =>
            getSlice(state[0])
        )
    }

    const shiftDown = () => {
        setSlice(state =>
            getSlice(state[2])
        )
    }

    return [slice, shiftUp, shiftDown]
}