import { HomePage } from "@/pages/home/ui/HomePage"
import type { Locale } from "@/shared/config/i18n"
import { isLocale, SUPPORTED_LOCALES } from "@/shared/config/i18n"
import { getPageContent, getSeo } from "@/shared/content"
import { buildPageMetadata } from "@/shared/seo/metadata"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export function generateStaticParams() {
	return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export const dynamicParams = false
export const revalidate = false

type PageProps = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const seo = getSeo(locale, "home")
	return buildPageMetadata({ locale, path: "", seo })
}

export default async function Page({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const content = getPageContent(locale, "home")
	return <HomePage content={content} />
}
