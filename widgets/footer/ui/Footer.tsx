import type { Locale } from "@/shared/config/i18n"
import { pagePathMap } from "@/shared/content"
import type { FooterContent, NavigationContent } from "@/shared/content/types"
import Link from "next/link"

type FooterProps = {
	content: FooterContent
	nav: NavigationContent
	locale: Locale
}

type FooterSitemapProps = {
	nav: NavigationContent
	locale: Locale
}

const FooterSitemap = ({ nav, locale }: FooterSitemapProps) => {
	const links = [
		{ label: nav.home, href: pagePathMap.home },
		{ label: nav.services, href: pagePathMap.services },
		{ label: nav.about, href: pagePathMap.about },
		{ label: nav.pricing, href: pagePathMap.pricing },
		{ label: nav.contacts, href: pagePathMap.contacts },
	]

	return (
		<nav aria-label="Sitemap" className="text-sm text-(--text-secondary) flex flex-col gap-2 ">
			<ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center">
				{links.map((link) => (
					<li key={link.href || "home"} className="text-center">
						<Link
							href={`/${locale}${link.href}` || `/${locale}`}
							className="hover:text-(--text-primary) underline-offset-4 hover:underline"
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

// Отображает футер с контактами, копирайтом и картой сайта.
export const Footer = ({ content, nav, locale }: FooterProps) => (
	<footer className="border-t border-(--border-subtle) bg-(--surface-card) backdrop-blur-md flex items-center justify-center">
		<div className="mx-auto flex w-full max-w-(--container-max) flex-col gap-(--footer-gap) px-(--footer-px) py-(--footer-py) text-sm text-(--text-secondary)">
			<FooterSitemap nav={nav} locale={locale} />
			<div className="flex flex-col gap-1 justify-center items-center">
				<p>{content.copyright}</p>
				<p>{content.contact}</p>
			</div>
		</div>
	</footer>
)

export { FooterSitemap }
