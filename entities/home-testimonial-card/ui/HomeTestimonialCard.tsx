import type { Testimonial } from "@/shared/content/types"
import { Star } from "lucide-react"

export const HomeTestimonialCard = ({
	testimonial,
}: {
	testimonial: Testimonial
}) => (
	<article className="flex flex-col gap-4 rounded-(--radius-card) border border-(--border-subtle) bg-(--surface-card) p-(--section-padding) shadow-(--shadow-card)">
		<div className="flex gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < testimonial.rating
						? "fill-(--chip-bg) text-(--chip-bg)"
						: "fill-(--text-muted) text-(--text-muted) opacity-30"
						}`}
				/>
			))}
		</div>
		<p className="flex-1 text-sm leading-relaxed text-(--text-secondary)">
			&ldquo;{testimonial.text}&rdquo;
		</p>
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-(--radius-pill) bg-(--chip-bg) text-sm font-bold text-(--text-primary)">
				{testimonial.name.charAt(0)}
			</div>
			<div>
				<p className="text-sm font-semibold text-(--text-primary)">
					{testimonial.name}
				</p>
				<p className="text-xs text-(--text-muted)">{testimonial.role}</p>
			</div>
		</div>
	</article>
)
