type PlaceholderProps = {
	label?: string
	className?: string
	aspect?: "video" | "square" | "wide"
}

const aspectMap = {
	video: "aspect-video",
	square: "aspect-square",
	wide: "aspect-[2/1]",
}

export const Placeholder = ({ label = "Image", className = "", aspect = "video" }: PlaceholderProps) => (
	<div
		className={`flex items-center justify-center rounded-2xl from-blue-100 to-blue-50 text-sm font-medium text-blue-400 ${aspectMap[aspect]} ${className}`}
	>
		{label}
	</div>
)
