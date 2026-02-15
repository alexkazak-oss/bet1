import { Placeholder } from '@/shared/ui/landing'

type LandingHeroProps = {
	eyebrow: string
	title: string
	description: string
	ctaPrimary: string
	ctaSecondary: string
}

export const LandingHero = ({ eyebrow, title, description, ctaPrimary, ctaSecondary }: LandingHeroProps) => (
	<section className="pb-16 pt-12 md:pb-24 md:pt-20">
		<div className="mx-auto flex max-w-(--l-max-w) flex-col-reverse items-center gap-10 px-(--l-px) md:flex-row md:gap-16">
			<div className="flex flex-1 flex-col gap-6">
				<span className="text-sm font-semibold uppercase tracking-wider text-(--l-accent)">{eyebrow}</span>
				<h1 className="text-(length:--hero-heading-lg) font-extrabold leading-tight text-(--l-text)">{title}</h1>
				<p className="max-w-lg text-base leading-relaxed md:text-lg text-(--l-text-muted)">{description}</p>
				<div className="flex flex-wrap gap-3">
					<a
						href="#"
						className="rounded-(--radius-pill) px-7 py-3 text-sm font-semibold bg-(--l-accent) text-(--l-bg) hover:bg-(--l-accent-hover) shadow-(--shadow-sm) transition"
					>
						{ctaPrimary}
					</a>
					<a
						href="#"
						className="rounded-(--radius-pill) border border-(--l-text-dark) px-7 py-3 text-sm font-semibold text-(--l-text-dark) hover:bg-(--l-border) shadow-(--shadow-sm) transition"
					>
						{ctaSecondary}
					</a>
				</div>
			</div>
			<div className="w-full flex-1">
				<Placeholder label="Hero Image" className="min-h-72 md:min-h-96" />
			</div>
		</div>
	</section>
)
