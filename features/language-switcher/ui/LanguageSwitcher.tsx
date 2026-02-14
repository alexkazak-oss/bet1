"use client"

import type { Locale } from "@/shared/config/i18n"
import { SUPPORTED_LOCALES } from "@/shared/config/i18n"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

// Собирает путь с новой локалью, сохраняя остальную часть URL.
const buildPath = (pathname: string, targetLocale: Locale): string => {
	const segments = pathname.split("/").filter(Boolean)
	const [, ...rest] = segments
	const suffix = rest.length ? `/${rest.join("/")}` : ""
	return `/${targetLocale}${suffix}`
}

// Рендерит кнопки переключения языков и обновляет маршрут при выборе.
export const LanguageSwitcher = () => {
	const pathname = usePathname()
	const router = useRouter()

	// Переключает локаль и перезагружает маршрут, чтобы применить переводы.
	const changeLocale = useCallback(
		(nextLocale: Locale) => {
			if (!pathname) return
			const nextPath = buildPath(pathname, nextLocale)
			document.cookie = `NEXT_LOCALE=${nextLocale}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax`
			router.push(nextPath)
			router.refresh()
		},
		[pathname, router],
	)

	return (
		<div className="flex items-center gap-(--nav-gap) text-sm font-medium text-(--text-secondary)">
			{SUPPORTED_LOCALES.map((locale) => {
				const isActive = pathname?.startsWith(`/${locale}`)
				return (
					<button
						key={locale}
						type="button"
						onClick={() => changeLocale(locale)}
						className={`rounded-(--radius-pill) px-3 py-1 transition ${isActive
							? "bg-(--chip-bg-active) text-(--chip-text-active)"
							: "bg-(--chip-bg) text-(--chip-text) hover:bg-(--chip-bg-hover)"
							}`}
						aria-current={isActive ? "page" : undefined}
					>
						{locale.toUpperCase()}
					</button>
				)
			})}
		</div>
	)
}
