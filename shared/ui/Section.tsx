type SectionProps = {
	title: string
	body: string
}

export const Section = ({ title, body }: SectionProps) => (
	<div className="flex flex-col gap-(--section-gap) rounded-(--radius-card) border border-(--border-subtle) bg-(--surface-card) p-(--section-padding) shadow-(--shadow-card) backdrop-blur-md">
		<h3 className="text-lg font-semibold text-(--text-primary)">{title}</h3>
		<p className="text-base leading-relaxed text-(--text-secondary)">{body}</p>
	</div>
)
