import { DEFAULT_LOCALE, isLocale } from "@/shared/config/i18n"
import { getBaseUrl, siteConfig } from "@/shared/config/site"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { headers } from "next/headers"
import type { ReactNode } from "react"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
})

export const metadata: Metadata = {
	metadataBase: new URL(getBaseUrl()),
	title: siteConfig.name,
	description: "",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	// Определяем локаль из URL, чтобы lang совпадал на сервере и клиенте и не вызывал гидрационные предупреждения.
	const headerList = await headers()
	const requestUrl = headerList.get("x-middleware-request-url")
	const pathname = requestUrl ? new URL(requestUrl).pathname : "/"
	const firstSegment = pathname.split("/").filter(Boolean)[0]
	const locale = isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE

	return (
		<html lang={locale} suppressHydrationWarning>
			<body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	)
}
