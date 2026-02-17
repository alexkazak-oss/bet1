import {SUPPORTED_LOCALES} from '@/shared/config/i18n'
import {getBaseUrl} from '@/shared/config/site'
import type {MetadataRoute} from 'next'

const ROUTES = ['', '/about', '/services', '/pricing', '/contacts']

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getBaseUrl()
	return SUPPORTED_LOCALES.flatMap((locale) =>
		ROUTES.map((path) => ({
			url: `${baseUrl}/${locale}${path}`,
			changeFrequency: 'weekly' as const,
			priority: path === '' ? 1 : 0.7,
		})),
	)
}
