import { DefaultHeader } from "@/widgets/default-header"
import { Heading, Text } from "@/shared/ui/text"
import { SmartCalendarView } from "@/widgets/calendar-month/ui/SmartCalendarView"

export const Calendar = () => {
    return <div className="flex flex-col items-center gap-4 w-full h-full">
        <DefaultHeader>Календарь</DefaultHeader>

        {/* todo вынести в компонент  */}
        <div className="flex flex-col justify-between p-4 h-45 w-full rounded-2xl bg-island">
            <div className="flex flex-col gap-2">
                <Heading>17 января</Heading>
                <Heading>Суббота</Heading>
            </div>
            <div className="flex flex-col gap-3">
                <Heading size="small" className="text-element-sub">6 уроков</Heading>
                <Text small bold className="text-element-sub">9:30 – 13:30</Text>
            </div>
        </div>
        <SmartCalendarView />
    </div>
}