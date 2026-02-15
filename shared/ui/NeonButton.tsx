"use client"

import { cn } from "@/shared/lib/utils"
import * as React from "react"


type NeonButtonProps = React.ComponentProps<"button"> & {
	hueRotate?: number
	neonColor?: string
	redirect?: boolean
}

function NeonButton({
	className,
	children,
	hueRotate,
	neonColor,
	style,
	redirect,
	...props
}: NeonButtonProps) {
	const combinedStyle: React.CSSProperties = {
		...(neonColor ? { "--neon-color": neonColor } : {}),
		...(hueRotate !== undefined ? { filter: `hue-rotate(${hueRotate}deg)` } : {}),
		...style,
	} as React.CSSProperties


	return (
		<button
			className={cn("neon-button", className)}
			style={combinedStyle}
			{...props}
		>
			{children}
		</button>
	)
}

export { NeonButton }
