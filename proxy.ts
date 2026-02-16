import siteJsonRaw from '@/content/site.json'
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const LOCALES = new Set<string>(siteJsonRaw.i18n.locales)
const DEFAULT_LOCALE = siteJsonRaw.i18n.defaultLocale
const REGION_LANGUAGE = siteJsonRaw.region.language
const COUNTRY_CODE = siteJsonRaw.region.countryCode

const LOCALE_COOKIE = 'NEXT_LOCALE'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

const isLocale = (value: string): boolean => LOCALES.has(value)

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

const getLocaleFromCookie = (request: NextRequest): string | undefined => {
	const value = request.cookies.get(LOCALE_COOKIE)?.value
	return value && LOCALES.has(value) ? value : undefined
}

const getLocaleFromAcceptLanguage = (
	request: NextRequest,
): string | undefined => {
	const header = request.headers.get('accept-language')?.toLowerCase()
	if (!header) return undefined
	const candidates = header
		.split(',')
		.map((part) => part.split(';')[0]?.trim())
		.filter(Boolean)
	for (const candidate of candidates) {
		for (const loc of LOCALES) {
			if (candidate.startsWith(loc)) return loc
		}
	}
	return undefined
}

type GeoRequest = NextRequest & {geo?: {country?: string}}

const getLocaleFromGeo = (request: GeoRequest): string | undefined => {
	const country = request.geo?.country?.toUpperCase()
	if (country === COUNTRY_CODE) return REGION_LANGUAGE
	return undefined
}

const detectLocale = (request: NextRequest): string => {
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

const setLocaleCookie = (response: NextResponse, locale: string): void => {
	response.cookies.set(LOCALE_COOKIE, locale, {
		maxAge: ONE_YEAR_SECONDS,
		path: '/',
		httpOnly: false,
		sameSite: 'lax',
	})
}

export function proxy(request: NextRequest) {
	const {pathname, searchParams} = request.nextUrl

	if (isPublicAsset(pathname)) {
		return NextResponse.next()
	}

	const segments = pathname.split('/').filter(Boolean)
	const pathnameLocale = segments[0]

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
