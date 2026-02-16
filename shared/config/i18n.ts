import {siteJson} from './site-json'

export const SUPPORTED_LOCALES = siteJson.i18n.locales

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE = siteJson.i18n.defaultLocale as Locale

// Проверяет, входит ли переданное значение в список поддерживаемых локалей.
export const isLocale = (value: string): value is Locale =>
	(SUPPORTED_LOCALES as readonly string[]).includes(value)
