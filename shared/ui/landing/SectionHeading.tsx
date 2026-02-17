type SectionHeadingProps = {
	eyebrow?: string
	title: string
	subtitle?: string
	align?: "left" | "center"
}

export const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) => (
	<div className={`flex flex-col gap-2 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
		{eyebrow ? <span className="text-sm font-semibold uppercase tracking-wider text-(--l-accent)">{eyebrow}</span> : null}
		<h2 className="text-(length:--section-heading-size) font-bold text-(--l-text)">{title}</h2>
		{subtitle ? <p className="max-w-(--section-subtitle-max-w) text-base leading-relaxed text-(--l-text-muted)">{subtitle}</p> : null}
	</div>
)
