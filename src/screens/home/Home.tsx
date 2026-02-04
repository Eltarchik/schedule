'use client'

import { Heading } from "@/shared/ui/text"
import { DaySchedule } from "@/widgets/day-schedule"
import { WeekSchedule } from "@/widgets/week-schedule/ui/WeekSchedule"
import { BurgerMenu } from "@/widgets/burger-menu"
import { WeekSelector } from "@/features/select-week/ui/WeekSelector"
import { useState } from "react"
import { PanelLeft, PanelLeftDashed } from "lucide-react"

export function Home() {
    const [dayScheduleOverlayShowed, setDayScheduleOvnerlayShowed] = useState(false)

    return (
        <div className="grid grid-cols-[1fr] xl:grid-cols-[416px_auto] grid-flow-col w-full">
            <div className="flex md:hidden xl:flex flex-col gap-4 w-full h-full overflow-hidden">
                <div className="flex w-full items-center justify-between gap-4">
                    <Heading size="large">Расписание</Heading>
                    <BurgerMenu className="md:hidden"/>
                </div>
                <div className="w-full h-0.25 bg-island"/>
                <div className="flex w-full h-full overflow-hidden xl:pr-4">
                    <DaySchedule/>
                </div>
            </div>
            { dayScheduleOverlayShowed &&
                <div className="absolute hidden md:flex xl:hidden w-104 h-full w-100 top-18.25 overflow-hidden bg-space">
                    <div className="flex py-4 h-[calc(100%-73px)] w-full overflow-hidden">
                        <DaySchedule/>
                    </div>
                    <div className="h-full w-0.25 bg-island ml-4"/>
                </div>
            }
            <div className="hidden md:flex overflow-hidden">
                <div className="hidden xl:block h-full w-0.25 bg-island"/>
                <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
                    <div className="grid grid-cols-[1fr_1fr_1fr] grid-flow-col gap-4 items-center w-full">
                        <div className="flex items-center gap-4 pl-4">
                            <button className="flex xl:hidden justify-center items-center size-10"
                                    onClick={() => setDayScheduleOvnerlayShowed(!dayScheduleOverlayShowed)}
                            >
                                {dayScheduleOverlayShowed
                                    ? <PanelLeftDashed/>
                                    : <PanelLeft/>
                                }
                            </button>
                            <Heading size="large">Неделя</Heading>
                        </div>
                        <div className="flex justify-center">
                            <WeekSelector/>
                        </div>
                        <BurgerMenu className="hidden md:flex ml-auto"/>
                    </div>
                    <div className="w-full h-0.25 bg-island"/>
                    <div className="flex w-full h-full overflow-hidden">
                        <WeekSchedule/>
                    </div>
                </div>
            </div>
        </div>
    )
}
