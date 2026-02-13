import { getBaseUrl, siteConfig } from "@/shared/config/site"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
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

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	// Оборачивает приложение глобальной разметкой и подключает выбранные шрифты.
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={` ${geistSans.variable} ${geistMono.variable} antialiased `}>
				{children}
			</body>
		</html>
	)
}
