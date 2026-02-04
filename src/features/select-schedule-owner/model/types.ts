export interface ScheduleOwner {
    id: number
    name: string
    type: ScheduleOwnerTypes
}

export enum ScheduleOwnerTypes {
    TEACHER = "teacher",
    GROUP = "group"
}