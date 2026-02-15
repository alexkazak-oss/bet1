import type {PageContent} from '@/shared/content/types'
import {Container} from '@/shared/ui/Container'
import {Hero} from '@/shared/ui/Hero'
import {Section} from '@/shared/ui/Section'
import {CTASection} from '@/widgets/home-cta'
import {ProcessSection} from '@/widgets/home-process'
import {ServicesSection} from '@/widgets/home-services'
import {StatsSection} from '@/widgets/home-stats'
import {HomeTestimonialsSection} from '@/widgets/home-testimonials'

export const HomePage = ({content}: {content: PageContent}) => (
	<>
		<div className='w-full flex items-center justify-center'>

		<Hero
			imageSrc='/bg/cards/bg-casino-poster.jpg'
			heading={content.hero.heading}
			lead={content.hero.lead}
			ctaLabel={content.hero.ctaLabel}
		/>
		</div>
		<Container>
			<div className='grid gap-(--section-grid-gap) sm:grid-cols-2'>
				{content.sections.map((section) => (
					<Section
						key={section.title}
						title={section.title}
						body={section.body}
					/>
				))}
			</div>

			{content.services && (
				<ServicesSection
					eyebrow={content.services.eyebrow}
					title={content.services.title}
					subtitle={content.services.subtitle}
					items={content.services.items}
				/>
			)}

			{content.stats && <StatsSection items={content.stats} />}

			{content.process && (
				<ProcessSection
					eyebrow={content.process.eyebrow}
					title={content.process.title}
					subtitle={content.process.subtitle}
					steps={content.process.steps}
				/>
			)}

			{content.testimonials && (
				<HomeTestimonialsSection
					eyebrow={content.testimonials.eyebrow}
					title={content.testimonials.title}
					subtitle={content.testimonials.subtitle}
					items={content.testimonials.items}
				/>
			)}

			{content.cta && (
				<CTASection
					heading={content.cta.heading}
					subtext={content.cta.subtext}
					buttonLabel={content.cta.buttonLabel}
				/>
			)}
		</Container>
	</>
)
