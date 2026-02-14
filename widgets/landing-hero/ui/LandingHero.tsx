import { Placeholder } from '@/shared/ui/landing'

type LandingHeroProps = {
	eyebrow: string
	title: string
	description: string
	ctaPrimary: string
	ctaSecondary: string
}

export const LandingHero = ({ eyebrow, title, description, ctaPrimary, ctaSecondary }: LandingHeroProps) => (
	<section className="bg-gradient-to-b from-blue-50 to-white pb-16 pt-12 md:pb-24 md:pt-20">
		<div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-5 md:flex-row md:gap-16">
			<div className="flex flex-1 flex-col gap-6">
				<span className="text-sm font-semibold uppercase tracking-wider text-blue-600">{eyebrow}</span>
				<h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">{title}</h1>
				<p className="max-w-lg text-base leading-relaxed text-gray-500 md:text-lg">{description}</p>
				<div className="flex flex-wrap gap-3">
					<a
						href="#"
						className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
					>
						{ctaPrimary}
					</a>
					<a
						href="#"
						className="rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
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
