import {getRequestConfig} from 'next-intl/server'
import siteJsonRaw from './content/site.json'

export const locales = siteJsonRaw.i18n.locales
export type AppLocale = (typeof locales)[number]
export const defaultLocale = siteJsonRaw.i18n.defaultLocale as AppLocale
export const localePrefix = 'always' as const

const isSupportedLocale = (value: string | undefined): value is AppLocale =>
	value !== undefined && (locales as readonly string[]).includes(value)

export default getRequestConfig(async ({requestLocale}) => {
	const requested = await requestLocale
	const locale = isSupportedLocale(requested) ? requested : defaultLocale

	return {
		locale,
	}
})
