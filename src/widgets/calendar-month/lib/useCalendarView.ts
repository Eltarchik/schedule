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
        const container = containerRef.current
        const firstMonth = firstMonthRef.current

        const shiftUp = () => {
            if (!container || !firstMonth) return

            const prevScrollTop = container.scrollTop

            setSlice(state => {
                const prevTopMonthDate = state[0]
                const topMonth = cloneDate(prevTopMonthDate, undefined, prevTopMonthDate.getMonth() - 1)

                return [topMonth, ...state.slice(0, sliceLength - 1)] as MonthsSlice
            })

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

            setSlice(state => {
                const prevBottomMonthDate = state[sliceLength - 1]
                const bottomMonth = cloneDate(prevBottomMonthDate, undefined, prevBottomMonthDate.getMonth() + 1)

                return [...state.slice(1, sliceLength), bottomMonth] as MonthsSlice
            })

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