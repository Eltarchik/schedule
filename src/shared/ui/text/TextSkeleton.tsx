type Preset = "hl" | "hm" | "hs" | "tm" | "ts"

interface Props {
    preset?: Preset
    className?: string
}

export const TextSkeleton = ({
    preset = "tm",
    className,
}: Props) => {
    let presetStyles = ""
    if (preset === "hl") presetStyles = "h-10"
    if (preset === "hm") presetStyles = "h-8"
    if (preset === "hs") presetStyles = "h-5"
    if (preset === "tm") presetStyles = "h-5"
    if (preset === "ts") presetStyles = "h-5"

    return <div className={`${presetStyles} w-10 rounded bg-element/10 ${className}`} />
}