import type { Locale } from "@/shared/config/i18n"
import { isLocale } from "@/shared/config/i18n"
import { siteConfig } from "@/shared/config/site"
import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"

export const runtime = "nodejs"

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
}

type PageProps = {
	params: Promise<{ locale: string }>
}

// Делает постоянный редирект на внешнюю цель, если локаль валидна и задан адрес.
export default async function RedirectPage({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const target = siteConfig.redirectTarget

	if (!target) {
		throw new Error("REDIRECT_TARGET_URL is not configured.")
	}

	permanentRedirect(target)

	return <p>Redirecting from {locale}…</p>
}
