import type { LandingFooterColumn, LandingNavLink } from '@/shared/content/landing-types'

type LandingFooterProps = {
	brand: string
	tagline: string
	columns: LandingFooterColumn[]
	copyright: string
	bottomLinks: LandingNavLink[]
}

export const LandingFooter = ({ brand, tagline, columns, copyright, bottomLinks }: LandingFooterProps) => (
	<footer className="bg-(--l-accent-bg)">
		<div className="mx-auto max-w-(--l-max-w) px-(--l-px) pb-8 pt-16">
			<div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
				{/* Brand column */}
				<div className="flex flex-col gap-4 md:col-span-2 lg:col-span-2">
					<a href="#" className="text-2xl font-extrabold text-(--l-accent)">{brand}</a>
					<p className="max-w-xs text-sm leading-relaxed text-(--l-text-muted)">{tagline}</p>
					<div className="flex gap-3">
						{['Twitter', 'Instagram', 'Facebook'].map((s) => (
							<a
								key={s}
								href="#"
								className="flex size-9 items-center justify-center rounded-(--radius-pill) bg-(--l-bg) text-xs font-bold text-(--l-text-faint) shadow-(--shadow-sm) transition hover:text-(--l-accent)"
								aria-label={s}
							>
								{s.charAt(0)}
							</a>
						))}
					</div>
				</div>

				{/* Link columns */}
				{columns.map((col) => (
					<div key={col.title} className="flex flex-col gap-4">
						<h4 className="text-sm font-bold text-(--l-text)">{col.title}</h4>
						<ul className="flex flex-col gap-2.5">
							{col.links.map((link) => (
								<li key={link.label}>
									<a href={link.href} className="text-sm text-(--l-text-muted) transition hover:text-(--l-accent)">
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Bottom bar */}
			<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-(--l-border-accent) pt-6 md:flex-row">
				<p className="text-xs text-(--l-text-faint)">{copyright}</p>
				<div className="flex gap-6">
					{bottomLinks.map((link) => (
						<a key={link.label} href={link.href} className="text-xs text-(--l-text-faint) transition hover:text-(--l-accent)">
							{link.label}
						</a>
					))}
				</div>
			</div>
		</div>
	</footer>
)
