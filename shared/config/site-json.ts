import raw from '@/content/site.json'
import type {SiteConfig, ValidatedSiteConfig} from './site-config.types'

function validateSiteConfig(input: SiteConfig): ValidatedSiteConfig {
	if (!input.brand?.name) {
		throw new Error('[site.json] brand.name is required')
	}
	if (
		!input.i18n?.locales ||
		!Array.isArray(input.i18n.locales) ||
		input.i18n.locales.length === 0
	) {
		throw new Error('[site.json] i18n.locales must be a non-empty array')
	}
	if (!input.i18n.locales.includes(input.i18n.defaultLocale)) {
		throw new Error(
			'[site.json] i18n.defaultLocale must be included in locales',
		)
	}
	return input as ValidatedSiteConfig
}

/** Typed, validated site configuration loaded from content/site.json */
export const siteJson = validateSiteConfig(raw)
