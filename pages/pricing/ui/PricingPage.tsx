import type { PageContent } from "@/shared/content/types"
import { Container } from "@/shared/ui/Container"
import { Hero } from "@/shared/ui/Hero"
import { Section } from "@/shared/ui/Section"

// Собирает страницу с тарифами, отображая геро и карточки пакетов.
export const PricingPage = ({ content }: { content: PageContent }) => (
	<Container>
		<Hero heading={content.hero.heading} lead={content.hero.lead} />
		<div className="grid gap-(--section-grid-gap) sm:grid-cols-3">
			{content.sections.map((section) => (
				<Section key={section.title} title={section.title} body={section.body} />
			))}
		</div>
	</Container>
)
