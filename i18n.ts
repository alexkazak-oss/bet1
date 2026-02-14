import {getRequestConfig} from 'next-intl/server'

export const locales = ['th', 'en'] as const
export type AppLocale = (typeof locales)[number]
export const defaultLocale: AppLocale = 'th'
export const localePrefix = 'always'

const isSupportedLocale = (value: string | undefined): value is AppLocale =>
	value !== undefined && (locales as readonly string[]).includes(value)

export default getRequestConfig(({locale}) => ({
	locale: isSupportedLocale(locale) ? locale : defaultLocale,
	locales,
	defaultLocale,
	localePrefix,
}))
