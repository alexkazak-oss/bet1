declare module '*.css'

declare module '@/content/site.json' {
	const value: {
		brand: {name: string}
		i18n: {locales: string[]; defaultLocale: string}
		region: {countryCode: string; language: string}
		seo: {
			titleTemplate: string
			defaultTitle: string
			description: string
			keywords: string[]
			robots: {index: boolean; follow: boolean}
		}
	}
	export default value
}

declare module '@/content/locales/*.json' {
	const value: Record<string, unknown>
	export default value
}
