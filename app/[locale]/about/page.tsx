import { AboutPage } from "@/pages/about/ui/AboutPage"
import type { Locale } from "@/shared/config/i18n"
import { isLocale } from "@/shared/config/i18n"
import { getPageContent, getSeo } from "@/shared/content"
import { buildPageMetadata } from "@/shared/seo/metadata"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = {
	params: Promise<{ locale: string }>
}

// Перечисляет локали для статической генерации страницы "About".
export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "th" }]
}

export const dynamicParams = false
export const revalidate = false

// Формирует SEO-метаданные раздела "About" для выбранной локали.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const seo = getSeo(locale, "about")
	return buildPageMetadata({ locale, path: "/about", seo })
}

// Отрисовывает страницу "About" с локализованным содержимым или возвращает 404 при неверной локали.
export default async function Page({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const content = getPageContent(locale, "about")
	return <AboutPage content={content} />
}
