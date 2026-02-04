import { DefaultHeader } from "@/widgets/default-header"
import { Heading, Text } from "@/shared/ui/text"
import { range } from "@/shared/lib/utils/array"

export const Calendar = () => {
    return <div className="flex flex-col items-center gap-4 w-full h-full overflow-hidden">
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

        <div className="flex flex-col gap-2 w-full">
            <Heading size="small">Январь 2026</Heading>
            <div className="grid grid-cols-7 grid-rows-7 gap-2 w-full">
                { [29, 30, 31, ...range(1, 31), 1].map((date, i) =>
                    <div key={i} className="flex flex-col items-center gap-1 pt-2 w-full h-13 rounded-lg">
                        <Text small>{ date }</Text>
                    </div>
                )}
            </div>
        </div>
    </div>
}