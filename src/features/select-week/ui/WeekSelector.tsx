import { ChevronLeft, ChevronRight } from "lucide-react"
import { Text } from "@/shared/ui/text"
import { useScheduleWeekStore } from "@/features/select-week"
import { useMemo } from "react"
import { formatDateIntervalText } from "@/shared/lib/datetime/formatDate"


export const WeekSelector = () => {
    const weekStart = useScheduleWeekStore(state => state.weekStart)
    const selectPrevWeek = useScheduleWeekStore(state => state.prevWeek)
    const selectNextWeek = useScheduleWeekStore(state => state.nextWeek)
    
    const datesPeriod = useMemo(() => {
        if (!weekStart) return ""
        const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6)
        return formatDateIntervalText(weekStart, weekEnd)
    }, [weekStart])

    return <div className="flex justify-between items-center w-80 h-6">
        <button className="flex size-6 items-center justify-center"
                onClick={selectPrevWeek}
        >
            <ChevronLeft />
        </button>
        <Text bold>{ datesPeriod }</Text>
        <button className="flex size-6 items-center justify-center"
                onClick={selectNextWeek}
        >
            <ChevronRight />
        </button>
    </div>
}