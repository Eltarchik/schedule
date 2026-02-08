export interface ScheduleOwner {
    id: number
    name: string
    type: ScheduleOwnerType
}

export enum ScheduleOwnerType {
    TEACHER = "teacher",
    GROUP = "group"
}