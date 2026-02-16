declare module '*.css'
declare module '@/content/site.json' {
	const value: {
		brand: {name: string}
		i18n: {locales: readonly string[]; defaultLocale: string}
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
