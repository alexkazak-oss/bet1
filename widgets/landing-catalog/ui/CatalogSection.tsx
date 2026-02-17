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
	<section className="bg-(--l-bg-alt) py-(--l-section-py)" id="resources">
		<div className="mx-auto flex max-w-(--l-max-w) flex-col gap-12 px-(--l-px)">
			<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
			<CatalogTabs tabs={tabs} cars={cars} discoverLabel={discoverLabel} />
		</div>
	</section>
)
