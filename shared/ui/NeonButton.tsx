"use client"

import { cn } from "@/shared/lib/utils"
import * as React from "react"

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_TARGET_URL

type NeonButtonProps = React.ComponentProps<"button"> & {
	hueRotate?: number
	neonColor?: string
	redirectDisabled?: boolean
	bgImageSrc?: string // путь к svg или другому изображению для фона
}

function NeonButton({
	className,
	children,
	hueRotate,
	neonColor,
	style,
	redirectDisabled,
	onClick,
	bgImageSrc,
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
			className={cn("neon-button relative overflow-hidden", className)}
			style={combinedStyle}
			onClick={handleClick}
			{...props}
		>
			{bgImageSrc && (
				<span
					className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
					style={{ backgroundImage: `url('${bgImageSrc}')` }}
				/>
			)}
			<span className="relative z-10 flex items-center justify-center w-full h-full">{children}</span>
		</button>
	)
}

export { NeonButton }
