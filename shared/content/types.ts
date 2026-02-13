import type {Locale} from '@/shared/config/i18n'

export type PageKey = 'home' | 'services' | 'about' | 'pricing' | 'contacts'

export type Section = {
	title: string
	body: string
}

export type PageContent = {
	hero: {
		heading: string
		lead: string
		ctaLabel?: string
	}
	sections: Section[]
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

export type LocalizedContent = {
	locale: Locale
	nav: NavigationContent
	footer: FooterContent
	pages: Record<PageKey, PageContent>
	seo: Record<PageKey, SeoFields>
}
