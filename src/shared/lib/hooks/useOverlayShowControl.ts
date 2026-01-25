import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"

export const useOverlayShowControl = <T extends HTMLDivElement>(): [
    boolean, Dispatch<SetStateAction<boolean>>, RefObject<T | null>
] => {
    const [ showed, setShowed ] = useState(false)
    const ref = useRef<T>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowed(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return [showed, setShowed, ref]
}