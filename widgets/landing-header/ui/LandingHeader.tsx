import type { LandingNavLink } from '@/shared/content/landing-types'
import { Menu } from 'lucide-react'

type LandingHeaderProps = {
	brand: string
	links: LandingNavLink[]
}

export const LandingHeader = ({ brand, links }: LandingHeaderProps) => (
	<header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-md">
		<div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
			<a href="#" className="text-xl font-extrabold text-blue-600">{brand}</a>

			<nav className="hidden items-center gap-6 md:flex">
				{links.map((link) => (
					<a
						key={link.label}
						href={link.href}
						className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
					>
						{link.label}
					</a>
				))}
			</nav>

			<div className="hidden items-center gap-3 md:flex">
				<a
					href="#"
					className="rounded-full px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
				>
					Login
				</a>
				<a
					href="#"
					className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
				>
					Sign up
				</a>
			</div>

			<button type="button" className="md:hidden" aria-label="Open menu">
				<Menu className="size-6 text-gray-700" />
			</button>
		</div>
	</header>
)
