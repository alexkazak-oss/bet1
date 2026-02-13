import {DEFAULT_LOCALE, isLocale} from '@/shared/config/i18n'
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const PUBLIC_FILES = [/^\/favicon\.ico$/, /^\/sitemap\.xml$/, /^\/robots\.txt$/]

// Определяет предпочитаемый язык из заголовка запроса и возвращает подходящий код локали.
const resolvePreferredLocale = (request: NextRequest): string => {
	const acceptLanguage = request.headers.get('accept-language') || ''
	const [first] = acceptLanguage.split(',')
	if (first?.toLowerCase().startsWith('th')) return 'th'
	return DEFAULT_LOCALE
}

// Перенаправляет на локализованные маршруты и нормализует URL с учётом поддерживаемых локалей.
export function middleware(request: NextRequest) {
	const {pathname} = request.nextUrl

	if (PUBLIC_FILES.some((regex) => regex.test(pathname))) {
		return NextResponse.next()
	}

	if (pathname === '/') {
		const locale = resolvePreferredLocale(request)
		return NextResponse.redirect(new URL(`/${locale}`, request.url), 308)
	}

	const segments = pathname.split('/').filter(Boolean)
	const locale = segments[0]

	if (!locale || !isLocale(locale)) {
		const restPath = segments.slice(1).join('/')
		const normalizedRest = restPath ? `/${restPath}` : ''
		return NextResponse.redirect(
			new URL(`/${DEFAULT_LOCALE}${normalizedRest}`, request.url),
			308,
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|api/).*)'],
}
