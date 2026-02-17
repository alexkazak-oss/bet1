import type {Locale} from '@/shared/config/i18n'
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from '@/shared/config/i18n'
import {getBaseUrl, siteConfig} from '@/shared/config/site'
import {siteJson} from '@/shared/config/site-json'
import type {SeoFields} from '@/shared/content/types'
import type {Metadata} from 'next'

const LOCALE_OG_MAP: Record<string, string> = {
	th: 'th_TH',
	en: 'en_US',
	ja: 'ja_JP',
	ko: 'ko_KR',
	zh: 'zh_CN',
	vi: 'vi_VN',
	id: 'id_ID',
	ms: 'ms_MY',
	de: 'de_DE',
	fr: 'fr_FR',
	es: 'es_ES',
	pt: 'pt_BR',
	ru: 'ru_RU',
}

const localeToOg = (locale: Locale): string => LOCALE_OG_MAP[locale] ?? 'en_US'

export type BuildMetadataParams = {
	locale: Locale
	path: string
	seo: SeoFields
}

export const buildPageMetadata = ({
	locale,
	path,
	seo,
}: BuildMetadataParams): Metadata => {
	const baseUrl = getBaseUrl()
	const normalizedPath = path === '/' ? '' : path
	const languageLinks = SUPPORTED_LOCALES.reduce<Record<string, string>>(
		(acc, code) => {
			acc[code] = `${baseUrl}/${code}${normalizedPath}`
			return acc
		},
		{},
	)

	const canonical = languageLinks[locale]
	const xDefaultLocale: Locale = DEFAULT_LOCALE
	languageLinks['x-default'] = languageLinks[xDefaultLocale]

	return {
		metadataBase: new URL(baseUrl),
		title: {
			default: seo.title,
			template: siteJson.seo.titleTemplate,
		},
		description: seo.description,
		keywords: siteJson.seo.keywords,
		alternates: {
			canonical,
			languages: languageLinks,
		},
		robots: {
			index: siteJson.seo.robots.index,
			follow: siteJson.seo.robots.follow,
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
