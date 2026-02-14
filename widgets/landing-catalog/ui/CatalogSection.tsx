import { CatalogTabs } from '@/features/catalog-tabs'
import type { LandingCar } from '@/shared/content/landing-types'
import { SectionHeading } from '@/shared/ui/landing'

type CatalogSectionProps = {
	eyebrow: string
	title: string
	subtitle: string
	tabs: string[]
	cars: LandingCar[]
	discoverLabel: string
}

export const CatalogSection = ({ eyebrow, title, subtitle, tabs, cars, discoverLabel }: CatalogSectionProps) => (
	<section className="bg-gray-50 py-16 md:py-24" id="resources">
		<div className="mx-auto flex max-w-6xl flex-col gap-12 px-5">
			<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
			<CatalogTabs tabs={tabs} cars={cars} discoverLabel={discoverLabel} />
		</div>
	</section>
)
