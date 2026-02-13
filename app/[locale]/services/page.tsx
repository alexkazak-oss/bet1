import { ServicesPage } from "@/pages/services/ui/ServicesPage"
import type { Locale } from "@/shared/config/i18n"
import { isLocale } from "@/shared/config/i18n"
import { getPageContent, getSeo } from "@/shared/content"
import { buildPageMetadata } from "@/shared/seo/metadata"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = {
	params: Promise<{ locale: string }>
}

// Перечисляет локали для предрендера страницы "Services".
export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "th" }]
}

export const dynamicParams = false
export const revalidate = false

// Собирает SEO-метаданные страницы услуг для выбранной локали.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const seo = getSeo(locale, "services")
	return buildPageMetadata({ locale, path: "/services", seo })
}

// Возвращает локализованный контент страницы услуг или 404 при неверной локали.
export default async function Page({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const content = getPageContent(locale, "services")
	return <ServicesPage content={content} />
}
