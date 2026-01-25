export interface ScheduleOwner {
    id: string
    name: string
    type: ScheduleOwnerTypes
}

export enum ScheduleOwnerTypes {
    TEACHER = "teacher",
    GROUP = "group"
}