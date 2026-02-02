import { UserRole } from "@/entities/user/model/types"

// todo add naming variation for different organisation types

export const userRoleToString = (role: UserRole) => {
    switch (role) {
        case UserRole.STUDENT:
            return "Студент"
        case UserRole.TEACHER:
            return "Учитель"
        case UserRole.ADMIN:
            return "Администратор"
    }
}