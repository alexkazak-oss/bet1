import {getBaseUrl} from '@/shared/config/site'
import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = getBaseUrl()
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api', '/_next'],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	}
}
