import type {Locale} from '@/shared/config/i18n'

export type PageKey = 'home' | 'services' | 'about' | 'pricing' | 'contacts'

export type Section = {
	title: string
	body: string
}

export type ServiceItem = {
	icon: string
	title: string
	description: string
}

export type StatItem = {
	value: string
	label: string
}

export type ProcessStep = {
	step: number
	title: string
	description: string
}

export type Testimonial = {
	id: string
	name: string
	role: string
	text: string
	rating: number
}

export type CTAContent = {
	heading: string
	subtext: string
	buttonLabel: string
}

export type PageContent = {
	hero: {
		heading: string
		lead: string
		ctaLabel?: string
	}
	sections: Section[]
	services?: {
		eyebrow: string
		title: string
		subtitle: string
		items: ServiceItem[]
	}
	stats?: StatItem[]
	process?: {
		eyebrow: string
		title: string
		subtitle: string
		steps: ProcessStep[]
	}
	testimonials?: {
		eyebrow: string
		title: string
		subtitle: string
		items: Testimonial[]
	}
	cta?: CTAContent
}

export type SeoFields = {
	title: string
	description: string
	ogTitle?: string
	ogDescription?: string
}

export type NavigationContent = {
	home: string
	services: string
	about: string
	pricing: string
	contacts: string
}

export type FooterContent = {
	copyright: string
	contact: string
}

export type FortuneWheelContent = {
	triggerLabel: string
	title: string
	description: string
	loading: string
	closeLabel: string
	doneLabel: string
	spinLabel: string
	spinningLabel: string
	idleStatus: string
	spinningStatus: string
	resultPrefix: string
	claimLabel: string
	claimingLabel: string
	emptyPrizes: string
	prizes: string[]
}

export type FeaturesContent = {
	fortuneWheel: FortuneWheelContent
}

export type LocalizedContent = {
	locale: Locale
	nav: NavigationContent
	footer: FooterContent
	pages: Record<PageKey, PageContent>
	seo: Record<PageKey, SeoFields>
	features: FeaturesContent
}
