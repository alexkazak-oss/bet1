import {siteJson} from './site-json'

export const SUPPORTED_LOCALES = siteJson.i18n.locales as readonly string[]

export type Locale = string & {}

export const DEFAULT_LOCALE: Locale = siteJson.i18n.defaultLocale

export const isLocale = (value: string): value is Locale =>
	(SUPPORTED_LOCALES as readonly string[]).includes(value)
