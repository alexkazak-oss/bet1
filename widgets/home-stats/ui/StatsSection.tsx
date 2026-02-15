import type { StatItem } from "@/shared/content/types"

export const StatsSection = ({ items }: { items: StatItem[] }) => (
	<section
		aria-label="Key statistics"
		className="w-full rounded-(--radius-hero) bg-(--surface-hero) px-(--hero-px) py-10"
	>
		<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
			{items.map((stat) => (
				<div
					key={stat.label}
					className="flex flex-col items-center gap-1 text-center"
				>
					<span className="text-(length:--stats-value-size) font-extrabold text-(--chip-bg)">
						{stat.value}
					</span>
					<span className="text-sm font-medium text-(--text-muted)">
						{stat.label}
					</span>
				</div>
			))}
		</div>
	</section>
)
