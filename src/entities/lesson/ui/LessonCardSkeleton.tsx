import { range } from "@/shared/lib/utils/array"

interface Props {
    count?: number
}

export const LessonCardSkeleton = (
    { count = 1 }: Props
) => {
    return <>
        { range(1, count).map(i =>
            <div key={i} className="flex rounded-2xl h-25 w-full bg-island/60"/>
        )}
    </>
}