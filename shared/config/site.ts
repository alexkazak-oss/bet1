import {siteJson} from './site-json'

export const siteConfig = {
	name: siteJson.brand.name,
	baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
	redirectTarget:
		process.env.NEXT_PUBLIC_REDIRECT_TARGET_URL || 'https://example.com',
}

export const getBaseUrl = (): string => siteConfig.baseUrl.replace(/\/$/, '')
