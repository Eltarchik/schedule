'use client'

import { useCalendarView } from "@/widgets/calendar-month/lib/useCalendarView"
import { CalendarMonthBlock } from "@/widgets/calendar-month/ui/CalendarMonthBlock"
import { useCalendarDayStore } from "@/features/select-calendar-day/model/calendarDay.store"
import { cloneDate } from "@/shared/lib/datetime/dateOperations"
import { useLayoutEffect, useRef } from "react"

export const SmartCalendarView = () => {
    const selectedDay = useCalendarDayStore(state => state.day)
    const pointerMonth = cloneDate(selectedDay || new Date(), undefined, undefined, 1)

    const [slice, firstRef, lastRef, containerRef, pointerIndex] = useCalendarView(pointerMonth)

    const pointerRef = useRef<HTMLDivElement | null>(null)

    const getRef = (index: number) => {
        if (index === 0) return firstRef
        if (index === pointerIndex) return pointerRef
        if (index === slice.length - 1) return lastRef
    }

    useLayoutEffect(() => {
        const container = containerRef.current
        const target = pointerRef.current
        if (!container || !target) return

        const containerTop = container.getBoundingClientRect().top
        const targetTop = target.getBoundingClientRect().top

        container.scrollTop += targetTop - containerTop
    }, [])

    return <div className="flex flex-col gap-4 w-full overflow-auto no-scrollbar"
                ref={containerRef}
                style={{ overflowAnchor: "none" }}
    >
        {slice.map((monthStart, i) =>
            <CalendarMonthBlock key={monthStart.toISOString()}
                                monthStart={monthStart}
                                ref={getRef(i)}
            />
        )}
    </div>
}