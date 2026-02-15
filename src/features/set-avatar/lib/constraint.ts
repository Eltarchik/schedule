export const MAX_SIZE = 2 * 1024 * 1024
export const ACCEPTABLE_FORMATS = ["image/png", "image/jpeg", "image/jpg", "image/webp"]

export const validateAvatar = (avatar: File) => {
    return avatar.size <= MAX_SIZE
        && ACCEPTABLE_FORMATS.includes(avatar.type)
}