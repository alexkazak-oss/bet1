import type {Locale} from '@/shared/config/i18n'
import {DEFAULT_LOCALE, isLocale, SUPPORTED_LOCALES} from '@/shared/config/i18n'
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const LOCALES = new Set(SUPPORTED_LOCALES)
const LOCALE_COOKIE = 'NEXT_LOCALE'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

const isPublicAsset = (pathname: string): boolean => {
	const hasFileExtension = /\.[^/]+$/.test(pathname)
	return (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/favicon.ico') ||
		pathname.startsWith('/robots.txt') ||
		pathname.startsWith('/sitemap.xml') ||
		hasFileExtension
	)
}

const getLocaleFromCookie = (request: NextRequest): Locale | undefined => {
	const value = request.cookies.get(LOCALE_COOKIE)?.value
	return value && LOCALES.has(value as Locale) ? (value as Locale) : undefined
}

const getLocaleFromAcceptLanguage = (
	request: NextRequest,
): Locale | undefined => {
	const header = request.headers.get('accept-language')?.toLowerCase()
	if (!header) return undefined
	const candidates = header
		.split(',')
		.map((part) => part.split(';')[0]?.trim())
		.filter(Boolean)
	for (const candidate of candidates) {
		if (candidate.startsWith('th')) return 'th'
		if (candidate.startsWith('en')) return 'en'
	}
	return undefined
}

type GeoRequest = NextRequest & {geo?: {country?: string}}

const getLocaleFromGeo = (request: GeoRequest): Locale | undefined => {
	const country = request.geo?.country?.toUpperCase()
	if (country === 'TH') return 'th'
	return undefined
}

const detectLocale = (request: NextRequest): Locale => {
	return (
		getLocaleFromCookie(request) ||
		getLocaleFromAcceptLanguage(request) ||
		getLocaleFromGeo(request as GeoRequest) ||
		DEFAULT_LOCALE
	)
}

const withVary = (response: NextResponse): NextResponse => {
	response.headers.set('Vary', 'Accept-Language, Cookie')
	return response
}

const setLocaleCookie = (response: NextResponse, locale: Locale): void => {
	response.cookies.set(LOCALE_COOKIE, locale, {
		maxAge: ONE_YEAR_SECONDS,
		path: '/',
		httpOnly: false,
		sameSite: 'lax',
	})
}

// Перенаправляет на локализованные маршруты с учётом cookie, Accept-Language, geo и дефолтной локали.
export function middleware(request: NextRequest) {
	const {pathname, searchParams} = request.nextUrl

	if (isPublicAsset(pathname)) {
		return NextResponse.next()
	}

	const segments = pathname.split('/').filter(Boolean)
	const pathnameLocale = segments[0]

	// Если локаль уже есть в URL, пропускаем, но ставим vary и cookie.
	if (pathnameLocale && isLocale(pathnameLocale)) {
		const response = NextResponse.next()
		setLocaleCookie(response, pathnameLocale)
		return withVary(response)
	}

	const locale = detectLocale(request)
	const redirectUrl = new URL(`/${locale}${pathname}`, request.url)
	redirectUrl.search = searchParams.toString()

	const response = NextResponse.redirect(redirectUrl, 307)
	setLocaleCookie(response, locale)
	return withVary(response)
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|api/|.*\\.[^/]+$).*)'],
}
