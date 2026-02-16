import { AboutPage } from "@/pages/about/ui/AboutPage"
import type { Locale } from "@/shared/config/i18n"
import { isLocale, SUPPORTED_LOCALES } from "@/shared/config/i18n"
import { getPageContent, getSeo } from "@/shared/content"
import { buildPageMetadata } from "@/shared/seo/metadata"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = {
	params: Promise<{ locale: string }>
}

export function generateStaticParams() {
	return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export const dynamicParams = false
export const revalidate = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const seo = getSeo(locale, "about")
	return buildPageMetadata({ locale, path: "/about", seo })
}

export default async function Page({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const content = getPageContent(locale, "about")
	return <AboutPage content={content} />
}
