export type LandingStep = {
	icon: string
	title: string
	description: string
}

export type LandingCar = {
	id: string
	title: string
	image: string
	price: number
	priceUnit: string
	category: string
}

export type LandingFeatureItem = {
	icon: string
	title: string
	description: string
}

export type LandingTestimonial = {
	id: string
	name: string
	role: string
	avatar: string
	text: string
	rating: number
}

export type LandingNavLink = {
	label: string
	href: string
}

export type LandingFooterColumn = {
	title: string
	links: LandingNavLink[]
}

export type LandingContent = {
	nav: LandingNavLink[]
	hero: {
		eyebrow: string
		title: string
		description: string
		ctaPrimary: string
		ctaSecondary: string
	}
	searchBar: {
		placeholder: string
		buttonLabel: string
	}
	steps: {
		eyebrow: string
		title: string
		subtitle: string
		items: LandingStep[]
	}
	catalog: {
		eyebrow: string
		title: string
		subtitle: string
		tabs: string[]
		cars: LandingCar[]
		discoverLabel: string
	}
	feature: {
		eyebrow: string
		title: string
		subtitle: string
		items: LandingFeatureItem[]
	}
	testimonials: {
		eyebrow: string
		title: string
		subtitle: string
		items: LandingTestimonial[]
	}
	footer: {
		brand: string
		tagline: string
		columns: LandingFooterColumn[]
		copyright: string
		bottomLinks: LandingNavLink[]
	}
}
