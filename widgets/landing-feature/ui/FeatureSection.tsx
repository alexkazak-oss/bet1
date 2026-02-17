import type { LandingFeatureItem } from '@/shared/content/landing-types'
import { Placeholder, SectionHeading } from '@/shared/ui/landing'
import { CalendarDays, DollarSign, Headphones, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'

const featureIconMap: Record<string, ReactNode> = {
	DollarSign: <DollarSign className="size-6" />,
	Headphones: <Headphones className="size-6" />,
	ShieldCheck: <ShieldCheck className="size-6" />,
	CalendarDays: <CalendarDays className="size-6" />,
}

type FeatureSectionProps = {
	eyebrow: string
	title: string
	subtitle: string
	items: LandingFeatureItem[]
}

export const FeatureSection = ({ eyebrow, title, subtitle, items }: FeatureSectionProps) => (
	<section className="bg-(--l-bg) py-(--l-section-py)" id="features">
		<div className="mx-auto max-w-(--l-max-w) px-(--l-px)">
			<div className="mb-12">
				<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
			</div>
			<div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
				<div className="w-full flex-1">
					<Placeholder label="Feature Image" className="min-h-72 md:min-h-96" />
				</div>
				<div className="flex flex-1 flex-col gap-8">
					{items.map((item) => (
						<div key={item.title} className="flex gap-4">
							<div className="flex size-12 shrink-0 items-center justify-cente bg-(--l-accent-light) text-(--l-accent)">
								{featureIconMap[item.icon] ?? <span className="text-lg">✦</span>}
							</div>
							<div className="flex flex-col gap-1">
								<h3 className="text-base font-bold text-(--l-text)">{item.title}</h3>
								<p className="text-sm leading-relaxed text-(--l-text-muted)">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	</section>
)
