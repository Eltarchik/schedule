import { Lesson } from "@/entities/lesson"
import { Heading, Text } from "@/shared/ui/text"


interface Props {
    lesson: Lesson
    style?: object
}

export const LessonCell = ({
    lesson,
    style

}: Props) => {
    if (!lesson.isAvailable) {
        return <div className="flex size-full rounded-2xl
            bg-[repeating-linear-gradient(-45deg,var(--space)_0px,var(--space)_8px,var(--island)_8px,var(--island)_16px)]"
                    style={style}
        />
    }


    return <div className="flex flex-col justify-between items-center p-2 size-full rounded-2xl bg-island"
                    style={style}
    >
        <Text className="text-xs/3 text-element-sub self-end">{ lesson.classroom }</Text>
        <Heading size="small"
                 className="text-center w-full overflow-hidden overflow-ellipsis"
                 style={{
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     WebkitLineClamp: 1 + (lesson.length - 1) * 4
                 }}
        >
            {lesson.subject}
        </Heading>
        <Text className="text-xs/3 text-element-sub self-start">{ lesson.owner }</Text>
    </div>
}