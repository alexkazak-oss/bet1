import { SearchBar } from '@/features/search-bar'
import { landingContent } from '@/shared/content/landing-data'
import { CatalogSection } from '@/widgets/landing-catalog'
import { FeatureSection } from '@/widgets/landing-feature'
import { LandingFooter } from '@/widgets/landing-footer'
import { LandingHeader } from '@/widgets/landing-header'
import { LandingHero } from '@/widgets/landing-hero'
import { MediaPairSection } from '@/widgets/landing-media'
import { StepsSection } from '@/widgets/landing-steps'
import { TestimonialsSection } from '@/widgets/landing-testimonials'

export const LandingPage = () => {
	const c = landingContent

	return (
		<div className="flex min-h-screen flex-col bg-white">
			<LandingHeader brand={c.footer.brand} links={c.nav} />

			<LandingHero
				eyebrow={c.hero.eyebrow}
				title={c.hero.title}
				description={c.hero.description}
				ctaPrimary={c.hero.ctaPrimary}
				ctaSecondary={c.hero.ctaSecondary}
			/>

			<SearchBar placeholder={c.searchBar.placeholder} buttonLabel={c.searchBar.buttonLabel} />

			<StepsSection
				eyebrow={c.steps.eyebrow}
				title={c.steps.title}
				subtitle={c.steps.subtitle}
				items={c.steps.items}
			/>

			<CatalogSection
				eyebrow={c.catalog.eyebrow}
				title={c.catalog.title}
				subtitle={c.catalog.subtitle}
				tabs={c.catalog.tabs}
				cars={c.catalog.cars}
				discoverLabel={c.catalog.discoverLabel}
			/>

			<FeatureSection
				eyebrow={c.feature.eyebrow}
				title={c.feature.title}
				subtitle={c.feature.subtitle}
				items={c.feature.items}
			/>

			<MediaPairSection />

			<TestimonialsSection
				eyebrow={c.testimonials.eyebrow}
				title={c.testimonials.title}
				subtitle={c.testimonials.subtitle}
				items={c.testimonials.items}
			/>

			<LandingFooter
				brand={c.footer.brand}
				tagline={c.footer.tagline}
				columns={c.footer.columns}
				copyright={c.footer.copyright}
				bottomLinks={c.footer.bottomLinks}
			/>
		</div>
	)
}
