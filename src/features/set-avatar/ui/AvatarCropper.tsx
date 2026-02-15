'use client'

import { createPortal } from "react-dom"
import { Button } from "@/shared/ui/buttons"
import { Text } from "@/shared/ui/text"
import { MouseEventHandler, ReactEventHandler, TouchEventHandler, useCallback, useEffect, useState } from "react"
import { CropData } from "@/features/set-avatar/model/types"

interface Props {
    avatar?: File
    showed: boolean
    onClose?: () => void
    onConfirm?: (data: CropData, avatar: File) => void
}

const DISPLAY_WIDTH = 320

interface ImageDimensions {
    width: number
    height: number
}

interface AvatarState {
    url?: string
    dimensions?: ImageDimensions
}

interface Position {
    x: number
    y: number
}

interface ClientPosition {
    clientX: number
    clientY: number
}

type Pointer = 0 | 1 | 2 | 3

export const AvatarCropper = ({
    avatar,
    showed,
    onClose,
    onConfirm,
}: Props) => {
    const [ avatarState, setAvatarState ] = useState<AvatarState>({})
    const [ cropData, setCropData ] = useState<CropData>({ x: 0, y: 0, size: 0 })

    const [ cropZoneMoving, setCropZoneMoving ] = useState(false)
    const [ startCursorPos, setStartCursorPos ] = useState<Position>({ x: 0, y: 0 })
    const [ startCropZonePos, setStartCropZonePos ] = useState<Position>({ x: 0, y: 0 })
    const [ startCropZoneSize, setStartCropZoneSize ] = useState(0)

    const [ movedPointer, setMovedPointer ] = useState<Pointer | undefined>()

    const avatarDimensions = avatarState.dimensions
    const avatarUrl = avatarState.url

    const scale = avatarDimensions ? DISPLAY_WIDTH / avatarDimensions.width : 0
    const offsetX = 0
    const offsetY = 0

    const centerX = offsetX + (cropData.x + cropData.size / 2) * scale
    const centerY = offsetY + (cropData.y + cropData.size / 2) * scale
    const radius = (cropData.size / 2) * scale

    const smartSetCropData = useCallback((
        callback: (data: CropData) => CropData,
        dims: ImageDimensions
    ) => {
        setCropData(prev => {
            const dirty = callback(prev)
            const maxSize = Math.min(dims.width, dims.height)

            const size = Math.max(0, Math.min(maxSize, dirty.size))
            const x = Math.max(0, Math.min(dims.width - size, dirty.x))
            const y = Math.max(0, Math.min(dims.height - size, dirty.y))

            return { size, x, y }
        })
    }, [])

    const moveCropZone = useCallback((pos: ClientPosition) => {
        if (!cropZoneMoving || scale <= 0 || !avatarDimensions) return

        const x = (pos.clientX - startCursorPos.x) / scale + startCropZonePos.x
        const y = (pos.clientY - startCursorPos.y) / scale + startCropZonePos.y

        smartSetCropData(prev => ({ ...prev, x, y }), avatarDimensions)
    }, [avatarDimensions, cropZoneMoving, scale, smartSetCropData, startCursorPos, startCropZonePos])

    const resizeCropZone = useCallback((pos: ClientPosition, pointer: Pointer) => {
        if (!avatarDimensions) return

        const xOffset = (pos.clientX - startCursorPos.x) / scale
        const yOffset = (pos.clientY - startCursorPos.y) / scale

        if (pointer === 0) {
            const maxOffset = Math.max(xOffset, yOffset)
            const size = startCropZoneSize - maxOffset
            const x = maxOffset + startCropZonePos.x
            const y = maxOffset + startCropZonePos.y

            if (x <= 0 || y <= 0) return

            smartSetCropData(() => ({ size, x, y }), avatarDimensions)
        }

        else if (pointer === 1) {
            const maxOffset = Math.max(-xOffset, yOffset)
            const size = startCropZoneSize - maxOffset
            const x = startCropZonePos.x
            const y = maxOffset + startCropZonePos.y

            if (x + size >= avatarDimensions.width || y <= 0) return

            smartSetCropData(() => ({ size, x, y }), avatarDimensions)
        }

        else if (pointer === 2) {
            const maxOffset = Math.max(-xOffset, -yOffset)
            const size = startCropZoneSize - maxOffset
            const x = startCropZonePos.x
            const y = startCropZonePos.y

            if (x + size >= avatarDimensions.width || y + size >= avatarDimensions.height) return

            smartSetCropData(() => ({ size, x, y }), avatarDimensions)
        }

        else if (pointer === 3) {
            const maxOffset = Math.max(xOffset, -yOffset)
            const size = startCropZoneSize - maxOffset
            const x = maxOffset + startCropZonePos.x
            const y = startCropZonePos.y

            if (x <= 0 || y + size >= avatarDimensions.height) return

            smartSetCropData(() => ({ size, x, y }), avatarDimensions)
        }
    }, [avatarDimensions, scale, smartSetCropData, startCursorPos, startCropZonePos, startCropZoneSize])

    const startMoving = () => {
        setStartCropZonePos({
            x: cropData.x,
            y: cropData.y,
        })
        setCropZoneMoving(true)
    }

    const onStartMovingMouse: MouseEventHandler<HTMLDivElement> = (event) => {
        setStartCursorPos({
            x: event.clientX,
            y: event.clientY,
        })
        startMoving()
    }

    const onStartMovingTouch: TouchEventHandler<HTMLDivElement> = (event) => {
        if (!event.touches.length) return

        setStartCursorPos({
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        })
        startMoving()
    }

    const startResizing = useCallback((pos: ClientPosition, pointer: Pointer) => {
        setStartCursorPos({ x: pos.clientX, y: pos.clientY })
        setStartCropZonePos({ x: cropData.x, y: cropData.y })
        setStartCropZoneSize(cropData.size)
        setMovedPointer(pointer)
    }, [ cropData.x, cropData.y, cropData.size ])

    const onStartResizingMouse = (pointer: Pointer): MouseEventHandler<HTMLButtonElement> => (event) => {
        startResizing(event, pointer)
    }

    const onStartResizingTouch = (pointer: Pointer): TouchEventHandler<HTMLButtonElement> => (event) => {
        if (event.touches.length === 0) return
        startResizing(
            { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY },
            pointer
        )
    }

    const clearDragState = useCallback(() => {
        setMovedPointer(undefined)
        setCropZoneMoving(false)
    }, [])

    useEffect(() => {
        document.addEventListener("mouseup", clearDragState)
        document.addEventListener("touchend", clearDragState, { passive: true })
        document.addEventListener("touchcancel", clearDragState, { passive: true })

        return () => {
            document.removeEventListener("mouseup", clearDragState)
            document.removeEventListener("touchend", clearDragState)
            document.removeEventListener("touchcancel", clearDragState)
        }
    }, [ clearDragState ])

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            if (cropZoneMoving) {
                moveCropZone(event)
            } else if (movedPointer !== undefined) {
                resizeCropZone(event, movedPointer)
            }
        }
        const onTouchMove = (event: TouchEvent) => {
            if (event.touches.length === 0) return
            const touch = event.touches[0]
            const pos: ClientPosition = { clientX: touch.clientX, clientY: touch.clientY }
            if (cropZoneMoving) {
                moveCropZone(pos)
            } else if (movedPointer !== undefined) {
                resizeCropZone(pos, movedPointer)
            }
        }
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("touchmove", onTouchMove, { passive: false })

        return () => {
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("touchmove", onTouchMove)
        }
    }, [ cropZoneMoving, moveCropZone, movedPointer, resizeCropZone ])

    useEffect(() => {
        if (!avatar) return

        const url = URL.createObjectURL(avatar)
        const updateAvatar = () => {
            setAvatarState(prev => ({ ...prev, url }))
        }
        updateAvatar()

        return () => URL.revokeObjectURL(url)
    }, [avatar])

    const onImageLoad: ReactEventHandler<HTMLImageElement> = useCallback((e) => {
        const img = e.currentTarget
        const w = img.naturalWidth
        const h = img.naturalHeight
        const dimensions = { width: w, height: h }
        setAvatarState(prev => ({ ...prev, dimensions }))
        const size = Math.min(w, h)
        setCropData({
            x: (w - size) / 2,
            y: (h - size) / 2,
            size,
        })
    }, [])

    if (!showed || !avatar || !avatarUrl) return undefined

    return createPortal(
        <div className="absolute flex justify-center items-center inset-0 bg-space/40">
            <div className="flex flex-col items-center gap-4" style={{ userSelect: "none" }}>
                <div className="relative bg-island"
                     style={{ width: DISPLAY_WIDTH }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="flex w-full h-auto rounded-xl pointer-events-none"
                         src={avatarUrl}
                         alt="avatar"
                         onLoad={onImageLoad}
                         style={{ width: DISPLAY_WIDTH, height: "auto" }}
                         draggable={false}
                    />

                    <div
                        className="absolute inset-0 bg-space/60 cursor-move touch-none"
                        style={{
                            maskImage: `radial-gradient(circle ${radius}px at ${centerX}px ${centerY}px, transparent 99.5%, black 100%)`,
                            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${centerX}px ${centerY}px, transparent 99.5%, black 100%)`,
                        }}
                        onMouseDown={onStartMovingMouse}
                        onTouchStart={onStartMovingTouch}
                    />

                    <button type="button"
                            className="absolute size-3 rounded-sm bg-element/60 cursor-nwse-resize touch-none"
                            style={{
                                left: offsetX + cropData.x * scale - 6,
                                top: offsetY + cropData.y * scale - 6,
                            }}
                            onMouseDown={onStartResizingMouse(0)}
                            onTouchStart={onStartResizingTouch(0)}
                    />
                    <button type="button"
                            className="absolute size-3 rounded-sm bg-element/60 cursor-nesw-resize touch-none"
                            style={{
                                left: offsetX + (cropData.x + cropData.size) * scale - 6,
                                top: offsetY + cropData.y * scale - 6,
                            }}
                            onMouseDown={onStartResizingMouse(1)}
                            onTouchStart={onStartResizingTouch(1)}
                    />
                    <button type="button"
                            className="absolute size-3 rounded-sm bg-element/60 cursor-nwse-resize touch-none"
                            style={{
                                left: offsetX + (cropData.x + cropData.size) * scale - 6,
                                top: offsetY + (cropData.y + cropData.size) * scale - 6,
                            }}
                            onMouseDown={onStartResizingMouse(2)}
                            onTouchStart={onStartResizingTouch(2)}
                    />
                    <button type="button"
                            className="absolute size-3 rounded-sm bg-element/60 cursor-nesw-resize touch-none"
                            style={{
                                left: offsetX + cropData.x * scale - 6,
                                top: offsetY + (cropData.y + cropData.size) * scale - 6,
                            }}
                            onMouseDown={onStartResizingMouse(3)}
                            onTouchStart={onStartResizingTouch(3)}
                    />
                </div>
                <div className="flex gap-2 w-full">
                    <Button className="w-full"
                            onClick={onClose}
                    >
                        <Text bold>Отмена</Text>
                    </Button>
                    <Button className="w-full enabled:bg-accent"
                            disabled={!avatarDimensions || cropData.size <= 0}
                            onClick={() => onConfirm?.(cropData, avatar)}
                    >
                        <Text bold>Сохранить</Text>
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}