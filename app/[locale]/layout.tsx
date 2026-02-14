import type { Locale } from "@/shared/config/i18n"
import { isLocale } from "@/shared/config/i18n"
import { getFeatures, getFooter, getNav } from "@/shared/content"
import { Footer } from "@/widgets/footer/ui/Footer"
import { Header } from "@/widgets/header/ui/Header"
import { NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
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

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale: localeParam } = await params
	if (!isLocale(localeParam)) {
		notFound()
	}
	const locale: Locale = localeParam
	setRequestLocale(locale)
	const nav = getNav(locale)
	const footer = getFooter(locale)
	const features = getFeatures(locale)

	return (
		<NextIntlClientProvider locale={locale} messages={{}}>
			<div className="flex min-h-screen flex-col">
				<Header locale={locale} nav={nav} fortuneWheel={features.fortuneWheel} />
				<main className="flex flex-1 flex-col items-center">{children}</main>
				<Footer content={footer} nav={nav} locale={locale} />
			</div>
		</NextIntlClientProvider>
	)
}
