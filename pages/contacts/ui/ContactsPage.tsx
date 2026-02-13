import type { PageContent } from "@/shared/content/types"
import { Container } from "@/shared/ui/Container"
import { Hero } from "@/shared/ui/Hero"
import { Section } from "@/shared/ui/Section"

// Формирует страницу контактов с блоком героя и сеткой контактных карточек.
export const ContactsPage = ({ content }: { content: PageContent }) => (
	<Container>
		<Hero heading={content.hero.heading} lead={content.hero.lead} ctaLabel={content.hero.ctaLabel} />
		<div id="contact" className="grid gap-(--section-grid-gap) sm:grid-cols-3">
			{content.sections.map((section) => (
				<Section key={section.title} title={section.title} body={section.body} />
			))}
		</div>
	</Container>
)
