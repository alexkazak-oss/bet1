import { ServiceCard } from "@/entities/service-card"
import type { ServiceItem } from "@/shared/content/types"

type ServicesSectionProps = {
	eyebrow: string
	title: string
	subtitle: string
	items: ServiceItem[]
}

export const ServicesSection = ({
	eyebrow,
	title,
	subtitle,
	items,
}: ServicesSectionProps) => (
	<section aria-labelledby="services-heading" className="w-full">
		<div className="mb-(--section-header-mb) flex flex-col items-center gap-(--section-header-gap) text-center">
			<span className="text-sm font-semibold uppercase tracking-wider text-(--chip-bg)">
				{eyebrow}
			</span>
			<h2
				id="services-heading"
				className="text-(length:--section-heading-size) font-bold text-(--text-on-dark)"
			>
				{title}
			</h2>
			<p className="max-w-(--section-subtitle-max-w) text-base leading-relaxed text-(--text-muted)">
				{subtitle}
			</p>
		</div>
		<div className="grid grid-cols-1 gap-(--section-grid-gap) sm:grid-cols-2 lg:grid-cols-4">
			{items.map((item) => (
				<ServiceCard key={item.title} service={item} />
			))}
		</div>
	</section>
)
