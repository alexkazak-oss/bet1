import {getBaseUrl} from '@/shared/config/site'
import {locales, pagePathMap} from '@/shared/content'
import type {MetadataRoute} from 'next'

const indexablePaths = [
	pagePathMap.home,
	pagePathMap.services,
	pagePathMap.about,
	pagePathMap.pricing,
	pagePathMap.contacts,
]

// Генерирует sitemap для всех локалей и основных маршрутов.
export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getBaseUrl()
	return locales.flatMap((locale) =>
		indexablePaths.map((path) => {
			const normalized = path || ''
			const url = `${baseUrl}/${locale}${normalized}`
			return {
				url,
				changefreq: 'weekly' as const,
				priority: path === '' ? 1 : 0.8,
			}
		}),
	)
}
