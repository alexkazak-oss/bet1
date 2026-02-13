type HeroProps = {
	heading: string
	lead: string
	ctaLabel?: string
}

// Отрисовывает крупный блок героя с заголовком, описанием и кнопкой по токенам темы.
export const Hero = ({ heading, lead, ctaLabel }: HeroProps) => (
	<div className="flex flex-col gap-(--hero-gap) rounded-(--radius-hero) bg-(--surface-hero) px-(--hero-px) py-(--hero-py) text-(--text-on-dark) shadow-(--shadow-soft)">
		<div className="flex flex-col gap-3 sm:max-w-3xl">
			<h1 className="text-(--hero-title-size) font-semibold leading-tight">{heading}</h1>
			<p className="text-(--hero-lead-size) leading-relaxed opacity-80">{lead}</p>
		</div>
		{ctaLabel ? (
			<div>
				<a
					className="inline-flex items-center justify-center rounded-(--radius-pill) bg-(--surface-card) px-4 py-2 text-sm font-semibold text-(--text-primary) shadow-(--shadow-button) transition hover:shadow-(--shadow-soft)"
					href="#contact"
				>
					{ctaLabel}
				</a>
			</div>
		) : null}
	</div>
)
