"use client"

import { cn } from "@/shared/lib/utils"
import * as React from "react"

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_TARGET_URL

type NeonButtonProps = React.ComponentProps<"button"> & {
	hueRotate?: number
	neonColor?: string
	redirectDisabled?: boolean
}

function NeonButton({
	className,
	children,
	hueRotate,
	neonColor,
	style,
	redirectDisabled,
	onClick,
	...props
}: NeonButtonProps) {
	const combinedStyle: React.CSSProperties = {
		...(neonColor ? { "--neon-color": neonColor } : {}),
		...(hueRotate !== undefined ? { filter: `hue-rotate(${hueRotate}deg)` } : {}),
		...style,
	} as React.CSSProperties

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(e)
		if (!redirectDisabled && REDIRECT_URL) {
			window.open(REDIRECT_URL, "_blank", "noopener,noreferrer")
		}
	}

	return (
		<button
			className={cn("neon-button", className)}
			style={combinedStyle}
			onClick={handleClick}
			{...props}
		>
			{children}
		</button>
	)
}

export { NeonButton }
