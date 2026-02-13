export const SUPPORTED_LOCALES = ['en', 'th'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'th'

// Проверяет, входит ли переданное значение в список поддерживаемых локалей.
export const isLocale = (value: string): value is Locale =>
	SUPPORTED_LOCALES.includes(value as Locale)
