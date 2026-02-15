"use client"

import type { Locale } from "@/shared/config/i18n"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useState } from "react"

type BurgerMenuProps = {
	locale: Locale
	links: Array<{ label: string; href: string }>
	extra?: ReactNode
}

export const BurgerMenu = ({ locale, links, extra }: BurgerMenuProps) => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const isActive = (href: string) => {
		const fullPath = `/${locale}${href}` || `/${locale}`
		if (href === "") return pathname === `/${locale}`
		return pathname?.startsWith(fullPath)
	}

	return (
		<div className="md:hidden">
			<button
				type="button"
				className="fixed right-(--burger-offset) top-(--burger-offset) z-30 flex h-(--burger-btn-size) w-(--burger-btn-size) items-center justify-center rounded-(--radius-pill) border border-(--border-subtle) bg-(--surface-card) text-(--text-primary) shadow-(--shadow-button) transition hover:bg-(--chip-bg-hover)"
				aria-label={isOpen ? "Close menu" : "Open menu"}
				aria-expanded={isOpen}
				aria-controls="mobile-nav"
				onClick={() => setIsOpen((v) => !v)}
			>
				<span className="relative block h-4 w-5">
					<span
						className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition ${isOpen ? "top-1/2 rotate-45" : "top-0"}`}
					/>
					<span
						className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition ${isOpen ? "opacity-0" : "top-1/2"}`}
					/>
					<span
						className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition ${isOpen ? "top-1/2 -rotate-45" : "bottom-0"}`}
					/>
				</span>
			</button>

			{isOpen ? (
				<div
					id="mobile-nav"
					className="fixed left-(--burger-panel-inset-x) right-(--burger-panel-inset-x) top-(--burger-panel-top) z-20 rounded-(--radius-card) border border-(--border-subtle) bg-(--surface-card) px-(--header-px) pb-(--header-py) pt-3 shadow-(--shadow-lg) backdrop-blur-sm"
				>
					<nav className="flex flex-col gap-2">
						{links.map((link) => (
							<Link
								key={link.href || "home"}
								href={`/${locale}${link.href}` || `/${locale}`}
								className={`rounded-(--radius-pill) px-(--chip-px) py-(--chip-py) text-sm font-medium transition ${isActive(link.href)
									? "bg-(--chip-bg-active) text-(--chip-text-active)"
									: "bg-(--chip-bg) text-(--chip-text) hover:bg-(--chip-bg-hover)"
									}`}
								aria-current={isActive(link.href) ? "page" : undefined}
								onClick={() => setIsOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</nav>
					{extra ? <div className="mt-3 border-t border-(--border-subtle) pt-3">{extra}</div> : null}
				</div>
			) : null}
		</div>
	)
}
