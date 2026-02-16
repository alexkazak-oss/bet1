import type {Locale} from '@/shared/config/i18n'
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from '@/shared/config/i18n'
import type {
	FeaturesContent,
	FooterContent,
	LocalizedContent,
	NavigationContent,
	PageContent,
	PageKey,
	SeoFields,
} from '@/shared/content/types'

// -- Locale JSON imports --------------------------------------------------
// When adding a new locale: 1) add the JSON file in content/locales/
// 2) add an import + entry in localeJsonMap below
// 3) add the locale code to content/site.json i18n.locales
import enJson from '@/content/locales/en.json'
import thJson from '@/content/locales/th.json'

const localeJsonMap: Record<string, Omit<LocalizedContent, 'locale'>> = {
	en: enJson as unknown as Omit<LocalizedContent, 'locale'>,
	th: thJson as unknown as Omit<LocalizedContent, 'locale'>,
}

// Build the runtime map keyed by locale
const contentByLocale = Object.fromEntries(
	SUPPORTED_LOCALES.map((loc) => [
		loc,
		{locale: loc, ...localeJsonMap[loc]} as LocalizedContent,
	]),
) as Record<Locale, LocalizedContent>

// Returns the localised content dictionary, falling back to default.
export const getContent = (locale: Locale = DEFAULT_LOCALE): LocalizedContent =>
	contentByLocale[locale] ?? contentByLocale[DEFAULT_LOCALE]

// Returns page-specific content for the given locale.
export const getPageContent = (locale: Locale, page: PageKey): PageContent =>
	getContent(locale).pages[page]

// Returns SEO fields for the given page and locale.
export const getSeo = (locale: Locale, page: PageKey): SeoFields =>
	getContent(locale).seo[page]

// Returns navigation labels for the given locale.
export const getNav = (locale: Locale): NavigationContent =>
	getContent(locale).nav

// Returns footer content for the given locale.
export const getFooter = (locale: Locale): FooterContent =>
	getContent(locale).footer

// Returns feature flags / copy for the given locale.
export const getFeatures = (locale: Locale): FeaturesContent =>
	getContent(locale).features

export const locales: Locale[] = [...SUPPORTED_LOCALES]

export const pagePathMap: Record<PageKey, string> = {
	home: '',
	services: '/services',
	about: '/about',
	pricing: '/pricing',
	contacts: '/contacts',
}
