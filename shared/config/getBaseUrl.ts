import {headers} from 'next/headers'

/**
 * Returns the fully-qualified base URL without a trailing slash.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL env var
 * 2. x-forwarded-host + x-forwarded-proto headers
 * 3. host header
 * 4. localhost fallback
 */
export async function getBaseUrl(): Promise<string> {
	const envUrl = process.env.NEXT_PUBLIC_SITE_URL
	if (envUrl) {
		return envUrl.replace(/\/$/, '')
	}

	const h = await headers()
	const forwardedHost = h.get('x-forwarded-host')
	const host = forwardedHost ?? h.get('host') ?? 'localhost:3000'
	const proto = h.get('x-forwarded-proto') ?? 'https'

	return `${proto}://${host}`
}
