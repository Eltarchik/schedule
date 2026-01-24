'use client'

import { LeftArrowIcon, RightArrowIcon } from "@/shared/ui/icons"
import { Text } from "@/shared/ui/text"
import { useSelectDayStore } from "@/features/select-day"
import { formatDateToFreeText } from "@/shared/lib/datetime/formatDate"


export const SelectDayRow = () => {
    const day = useSelectDayStore(state => state.day)
    const selectPrevDay = useSelectDayStore(state => state.prevDay)
    const selectNextDay = useSelectDayStore(state => state.nextDay)

    const dateText = formatDateToFreeText(day)

    return <div className="flex items-center justify-between w-full h-6">
        <button className="flex size-6 items-center justify-center"
                onClick={() => selectPrevDay()}
        >
            <LeftArrowIcon/>
        </button>
        <button className="flex px-4 items-center justify-center">
            <Text bold>{ dateText }</Text>
        </button>
        <button className="flex size-6 items-center justify-center"
                onClick={() => selectNextDay()}
        >
            <RightArrowIcon/>
        </button>
    </div>
}