import type { PageContent } from "@/shared/content/types"
import { Container } from "@/shared/ui/Container"
import { Hero } from "@/shared/ui/Hero"
import { Section } from "@/shared/ui/Section"

// Собирает главную страницу из блока героя и списка разделов.
export const HomePage = ({ content }: { content: PageContent }) => (
	<Container>
		<Hero heading={content.hero.heading} lead={content.hero.lead} ctaLabel={content.hero.ctaLabel} />
		<div className="grid gap-(--section-grid-gap) sm:grid-cols-2">
			{content.sections.map((section) => (
				<Section key={section.title} title={section.title} body={section.body} />
			))}
		</div>
	</Container>
)
