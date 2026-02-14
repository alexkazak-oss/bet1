type SectionHeadingProps = {
	eyebrow?: string
	title: string
	subtitle?: string
	align?: "left" | "center"
}

export const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) => (
	<div className={`flex flex-col gap-2 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
		{eyebrow ? <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">{eyebrow}</span> : null}
		<h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
		{subtitle ? <p className="max-w-2xl text-base leading-relaxed text-gray-500">{subtitle}</p> : null}
	</div>
)
