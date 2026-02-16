export type SiteConfig = {
	brand: {
		name: string
	}
	i18n: {
		defaultLocale: string
		locales: string[]
	}
	region: {
		countryCode: string
		language: string
	}
	seo: {
		titleTemplate: string
		defaultTitle: string
		description: string
		keywords: string[]
		robots: {
			index: boolean
			follow: boolean
		}
	}
}

export type ValidatedSiteConfig = SiteConfig & {
	i18n: {
		defaultLocale: string
		locales: [string, ...string[]]
	}
}
