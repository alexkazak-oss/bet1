"use client"

import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher"
import type { Locale } from "@/shared/config/i18n"
import { pagePathMap } from "@/shared/content"
import type { NavigationContent } from "@/shared/content/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

type HeaderProps = {
	locale: Locale
	nav: NavigationContent
}

// Отрисовывает шапку с локализованной навигацией и переключателем языка.
export const Header = ({ locale, nav }: HeaderProps) => {
	const pathname = usePathname()

	const links = [
		{ label: nav.home, href: pagePathMap.home },
		{ label: nav.services, href: pagePathMap.services },
		{ label: nav.about, href: pagePathMap.about },
		{ label: nav.pricing, href: pagePathMap.pricing },
		{ label: nav.contacts, href: pagePathMap.contacts },
	]

	// Проверяет, совпадает ли текущий маршрут с ссылкой, чтобы подсветить активный пункт.
	const isActive = (href: string) => {
		const fullPath = `/${locale}${href}` || `/${locale}`
		if (href === "") return pathname === `/${locale}`
		return pathname?.startsWith(fullPath)
	}

	// Рендерит шапку сайта с логотипом, навигацией и переключателем языка.
	return (
		<header className="sticky top-0 z-20 border-b border-(--border-subtle) bg-(--surface-card) backdrop-blur-md">
			<div className="mx-auto flex w/full max-w-(--container-max) items-center justify-between gap-(--header-gap) px-(--header-px) py-(--header-py)">
				<div className="flex items-center gap-(--header-gap)">
					<Link href={`/${locale}`} className="text-lg font-semibold text-(--text-primary)">
						Acme
					</Link>
					<nav className="flex flex-wrap items-center gap-(--nav-gap)">
						{links.map((link) => (
							<Link
								key={link.href || "home"}
								href={`/${locale}${link.href}` || `/${locale}`}
								className={`rounded-(--radius-pill) px-3 py-2 text-sm font-medium transition ${isActive(link.href)
									? "bg-(--chip-bg-active) text-(--chip-text-active)"
									: "bg-(--chip-bg) text-(--chip-text) hover:bg-(--chip-bg-hover)"
									}`}
								aria-current={isActive(link.href) ? "page" : undefined}
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
				<LanguageSwitcher />
			</div>
		</header>
	)
}
