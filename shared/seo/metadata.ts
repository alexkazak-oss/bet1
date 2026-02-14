import type {Locale} from '@/shared/config/i18n'
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from '@/shared/config/i18n'
import {getBaseUrl, siteConfig} from '@/shared/config/site'
import type {SeoFields} from '@/shared/content/types'
import type {Metadata} from 'next'

// Маппит локаль Next.js в формат locale для OpenGraph.
const localeToOg = (locale: Locale): string =>
	locale === 'th' ? 'th_TH' : 'en_US'

export type BuildMetadataParams = {
	locale: Locale
	path: string // leading slash or empty for root
	seo: SeoFields
}

export const buildPageMetadata = ({
	locale,
	path,
	seo,
}: BuildMetadataParams): Metadata => {
	// Собирает метаданные страницы (каноникал, OG, twitter) для переданной локали и пути.
	const baseUrl = getBaseUrl()
	const normalizedPath = path === '/' ? '' : path
	const localizedPath = `/${locale}${normalizedPath}`
	const languageLinks = SUPPORTED_LOCALES.reduce<Record<string, string>>(
		(acc, code) => {
			acc[code] = `${baseUrl}/${code}${normalizedPath}` || `${baseUrl}/${code}`
			return acc
		},
		{},
	)

	const canonical = languageLinks[locale]
	const xDefaultLocale: Locale = DEFAULT_LOCALE
	languageLinks['x-default'] = languageLinks[xDefaultLocale]

	return {
		metadataBase: new URL(baseUrl),
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical,
			languages: languageLinks,
		},
		robots: {
			index: true,
			follow: true,
		},
		openGraph: {
			title: seo.ogTitle ?? seo.title,
			description: seo.ogDescription ?? seo.description,
			url: canonical,
			siteName: siteConfig.name,
			locale: localeToOg(locale),
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: seo.ogTitle ?? seo.title,
			description: seo.ogDescription ?? seo.description,
		},
	}
}
