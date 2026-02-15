"use client"

import { BurgerMenu } from "@/features/burger-menu"
import { FortuneWheelDialog } from "@/features/fortune-wheel"
import { LanguageSwitcher } from "@/features/language-switcher"
import type { Locale } from "@/shared/config/i18n"
import { pagePathMap } from "@/shared/content"
import type { FortuneWheelContent, NavigationContent } from "@/shared/content/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

type HeaderProps = {
	locale: Locale
	nav: NavigationContent
	fortuneWheel: FortuneWheelContent
}

// Отрисовывает шапку с локализованной навигацией и переключателем языка.
export const Header = ({ locale, nav, fortuneWheel }: HeaderProps) => {
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

	return (
		<header className="flex items-center justify-center sticky top-0 z-20 border-b border-(--border-subtle) bg-(--surface-card) backdrop-blur-md">
			<div className="mx-auto hidden w-full max-w-(--container-max) gap-(--header-gap) px-(--header-px) py-(--header-py) md:flex">
				<div className="flex w-full justify-between gap-(--header-gap)">
					<Link href={`/${locale}`} className="text-lg font-semibold text-(--text-primary)">
						Acme
					</Link>
					<nav className="flex flex-wrap items-center gap-(--nav-gap) justify-center">
						{links.map((link) => (
							<Link
								key={link.href || "home"}
								href={`/${locale}${link.href}` || `/${locale}`}
								className={`rounded-(--radius-pill) px-(--chip-px) py-(--chip-py) text-sm font-medium transition ${isActive(link.href)
									? "bg-(--chip-bg-active) text-(--chip-text-active)"
									: "bg-(--chip-bg) text-(--chip-text) hover:bg-(--chip-bg-hover)"
									}`}
								aria-current={isActive(link.href) ? "page" : undefined}
							>
								{link.label}
							</Link>
						))}
					</nav>
					<div className="flex items-center gap-(--header-actions-gap)">
						<FortuneWheelDialog locale={locale} copyOverride={fortuneWheel} />
						<LanguageSwitcher />
					</div>
				</div>
			</div>
			<div className="md:hidden">
				<Link
					href={`/${locale}`}
					className="fixed left-4 top-4 z-30 text-lg font-semibold text-(--text-primary)"
				>
					Acme
				</Link>
				<BurgerMenu
					locale={locale}
					links={links}
					extra={
						<div className="flex flex-col gap-(--header-actions-gap)">
							<FortuneWheelDialog locale={locale} copyOverride={fortuneWheel} />
							<LanguageSwitcher />
						</div>
					}
				/>
			</div>
		</header>
	)
}
