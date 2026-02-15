export enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN"
}

export interface UserProfile {
    name: string
    email: string
    roles: UserRole[]
    avatar?: string
}