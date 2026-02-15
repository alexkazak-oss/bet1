export const siteConfig = {
	name: 'BET',
	baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
	redirectTarget:
		process.env.NEXT_PUBLIC_REDIRECT_TARGET_URL || 'https://example.com',
}

// Возвращает базовый URL без завершающего слэша для построения ссылок.
export const getBaseUrl = (): string => siteConfig.baseUrl.replace(/\/$/, '')
