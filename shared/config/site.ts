import {siteJson} from './site-json'

export const siteConfig = {
	name: siteJson.brand.name,
	baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
	redirectTarget: process.env.REDIRECT_TARGET_URL || 'https://example.com',
}

// Возвращает базовый URL без завершающего слэша для построения ссылок и SEO-метаданных
export const getBaseUrl = (): string => siteConfig.baseUrl.replace(/\/$/, '')
