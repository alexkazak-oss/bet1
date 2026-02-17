import type { LandingNavLink } from '@/shared/content/landing-types'
import { Menu } from 'lucide-react'

type LandingHeaderProps = {
	brand: string
	links: LandingNavLink[]
}

export const LandingHeader = ({ brand, links }: LandingHeaderProps) => (
	<header className="sticky top-0 z-30 border-b border-(--l-border) bg-(--l-bg)/90 backdrop-blur-md">
		<div className="mx-auto flex max-w-(--l-max-w) items-center justify-between px-(--l-px) py-4">
			<a href="#" className="text-xl font-extrabold text-(--l-accent)">{brand}</a>

			<nav className="hidden items-center gap-6 md:flex">
				{links.map((link) => (
					<a
						key={link.label}
						href={link.href}
						className="text-sm font-medium text-(--l-text-secondary) transition hover:text-(--l-accent)"
					>
						{link.label}
					</a>
				))}
			</nav>

			<div className="hidden items-center gap-3 md:flex">
				<a
					href="#"
					className="rounded-(--radius-pill) px-5 py-2 text-sm font-semibold text-(--l-text-dark) transition hover:bg-(--l-border)"
				>
					Login
				</a>
				<a
					href="#"
					className="rounded-(--radius-pill) bg-(--l-accent) px-5 py-2 text-sm font-semibold text-(--l-bg) shadow-(--shadow-sm) transition hover:bg-(--l-accent-hover)"
				>
					Sign up
				</a>
			</div>

			<button type="button" className="md:hidden" aria-label="Open menu">
				<Menu className="size-6 text-(--l-text-dark)" />
			</button>
		</div>
	</header>
)
