import type { Locale } from "@/shared/config/i18n"
import { isLocale } from "@/shared/config/i18n"
import { getFooter, getNav } from "@/shared/content"
import { Footer } from "@/widgets/footer/ui/Footer"
import { Header } from "@/widgets/header/ui/Header"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

// Описывает локали, для которых заранее собираются страницы.
export function generateStaticParams() {
	return [{ locale: "th" }, { locale: "en" }]
}

export const dynamicParams = false

export const revalidate = false

type LocaleLayoutProps = {
	children: ReactNode
	params: Promise<{ locale: string }>
}

// Строит каркас страницы с хедером и футером для конкретной локали или отдаёт 404 при неверной локали.
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) {
		notFound()
	}
	const locale: Locale = localeParam
	const nav = getNav(locale)
	const footer = getFooter(locale)

	return (
		<div className="flex min-h-screen flex-col">
			<Header locale={locale} nav={nav} />
			<main className="flex flex-1 flex-col items-center">{children}</main>
			<Footer content={footer} />
		</div>
	)
}
