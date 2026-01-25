const loadFromStorage = <T>(storage: Storage, key: string) => {
    try {
        const value = storage.getItem(key)
        return value ? JSON.parse(value) as T : undefined

    } catch {
        return
    }
}

const saveToStorage = <T>(storage: Storage, key: string, value: T) => {
    storage.setItem(key, JSON.stringify(value))
}

export const loadFromLocalStorage = <T>(key: string) => {
    return loadFromStorage<T>(localStorage, key)
}

export const saveToLocalStorage = <T>(key: string, value: T) => {
    saveToStorage<T>(localStorage, key, value)
}

export const loadFromSessionStorage = <T>(key: string) => {
    return loadFromStorage<T>(sessionStorage, key)
}

export const saveToSessionStorage = <T>(key: string, value: T) => {
    saveToStorage<T>(sessionStorage, key, value)
}