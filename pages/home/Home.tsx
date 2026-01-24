import { Header } from "@/shared/ui/text"
import { DailySchedule } from "@/widgets/daily-schedule"

export function Home() {
    return (
        <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
            <div className="flex w-full items-center justify-between gap-4">
                <Header size="large">Расписание</Header>
                <div className="w-10 h-10 rounded-full bg-island"></div>
            </div>
            <div className="w-full h-0.25 bg-island"></div>
            <DailySchedule />
        </div>
    )
}
