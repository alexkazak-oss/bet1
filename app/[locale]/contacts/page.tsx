import { ContactsPage } from "@/pages/contacts/ui/ContactsPage"
import type { Locale } from "@/shared/config/i18n"
import { isLocale } from "@/shared/config/i18n"
import { getPageContent, getSeo } from "@/shared/content"
import { buildPageMetadata } from "@/shared/seo/metadata"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = {
	params: Promise<{ locale: string }>
}

// Перечисляет локали для статической генерации страницы контактов.
export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "th" }]
}

export const dynamicParams = false
export const revalidate = false

// Собирает SEO-метаданные страницы контактов для выбранной локали.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const seo = getSeo(locale, "contacts")
	return buildPageMetadata({ locale, path: "/contacts", seo })
}

// Отрисовывает страницу контактов с локализованным контентом или отдаёт 404 при неверной локали.
export default async function Page({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) notFound()
	const locale: Locale = localeParam
	const content = getPageContent(locale, "contacts")
	return <ContactsPage content={content} />
}
