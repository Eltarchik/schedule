import { RefObject, useEffect, useRef, useState } from "react"
import { cloneDate } from "@/shared/lib/datetime/dateOperations"

type MonthsSlice = [Date, Date, Date, Date, Date]

const sliceLength = 5
const pointerIndex = Math.floor(sliceLength / 2)

const getSlice = (pointerMonth: Date): MonthsSlice => {
    return [
        cloneDate(pointerMonth, undefined, pointerMonth.getMonth() - 2, 1),
        cloneDate(pointerMonth, undefined, pointerMonth.getMonth() - 1, 1),
        cloneDate(pointerMonth),
        cloneDate(pointerMonth, undefined, pointerMonth.getMonth() + 1, 1),
        cloneDate(pointerMonth, undefined, pointerMonth.getMonth() + 2, 1),
    ]
}

export const useCalendarView = (defaultMonthStart: Date): [
    MonthsSlice,
    RefObject<HTMLDivElement | null>,
    RefObject<HTMLDivElement | null>,
    RefObject<HTMLDivElement | null>,
    number,
] => {
    const initialSlice = getSlice(defaultMonthStart)
    const [slice, setSlice] = useState<MonthsSlice>(initialSlice)

    const firstMonthRef = useRef<HTMLDivElement | null>(null)
    const lastMonthRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const shiftBy = (offset: number) => {
            setSlice(state => getSlice(state[pointerIndex + offset]))
        }

        const container = containerRef.current
        const firstMonth = firstMonthRef.current

        const shiftUp = () => {
            if (!container || !firstMonth) return

            const prevScrollTop = container.scrollTop

            shiftBy(-1)

            requestAnimationFrame(() => {
                const newFirstMonth = firstMonthRef.current
                if (!newFirstMonth) return

                const newFirstMonthHeight = newFirstMonth.getBoundingClientRect().height
                container.scrollTop = prevScrollTop + newFirstMonthHeight
            })
        }

        const shiftDown = () => {
            if (!container || !firstMonth) return

            const prevScrollTop = container.scrollTop
            const prevFirstMonthHeight = firstMonth.getBoundingClientRect().height

            shiftBy(1)

            requestAnimationFrame(() => {
                container.scrollTop = prevScrollTop - prevFirstMonthHeight
            })
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return

                if (entry.target === firstMonthRef.current) {
                    shiftUp()
                }
                else if (entry.target === lastMonthRef.current) {
                    shiftDown()
                }
            })},
            {
                root: containerRef.current,
            }
        )

        if (firstMonthRef.current) observer.observe(firstMonthRef.current)
        if (lastMonthRef.current) observer.observe(lastMonthRef.current)

        return () => observer.disconnect()
    }, [slice, setSlice])

    return [slice, firstMonthRef, lastMonthRef, containerRef, pointerIndex]
}