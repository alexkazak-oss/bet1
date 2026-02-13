import { PricingPage } from "@/pages/pricing/ui/PricingPage"
import type { Locale } from "@/shared/config/i18n"
import { isLocale } from "@/shared/config/i18n"
import { getPageContent, getSeo } from "@/shared/content"
import { buildPageMetadata } from "@/shared/seo/metadata"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = {
	params: Promise<{ locale: string }>
}

// Перечисляет локали для статической генерации страницы "Pricing".
export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "th" }]
}

export const dynamicParams = false
export const revalidate = false

// Формирует SEO-метаданные прайсинга для указанной локали.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const seo = getSeo(locale, "pricing")
	return buildPageMetadata({ locale, path: "/pricing", seo })
}

// Возвращает локализованный контент страницы прайсинга или 404 при ошибке локали.
export default async function Page({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const content = getPageContent(locale, "pricing")
	return <PricingPage content={content} />
}
