import { Header } from "@/shared/ui/text"
import { type Lesson, LessonCard } from "@/entities/lesson"

const les: Lesson = {
    id: "1",
    subject: "Математика",
    teacher: "Богданов М.Р.",
    classroom: "ав-4311-А",
    startTime: "9:00",
    endTime: "10:30",
}

export default function Home() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full items-center justify-between gap-4">
                <Header size="large">Расписание</Header>
                <div className="w-10 h-10 rounded-full bg-island"></div>
            </div>
            <div className="w-full h-0.25 bg-island"></div>
            <div className="flex flex-col gap-4 w-full">
                <LessonCard lesson={les} />
            </div>
        </div>
    )
}
