import { HomeTestimonialCard } from "@/entities/home-testimonial-card"
import type { Testimonial } from "@/shared/content/types"

type HomeTestimonialsSectionProps = {
	eyebrow: string
	title: string
	subtitle: string
	items: Testimonial[]
}

export const HomeTestimonialsSection = ({
	eyebrow,
	title,
	subtitle,
	items,
}: HomeTestimonialsSectionProps) => (
	<section aria-labelledby="testimonials-heading" className="w-full">
		<div className="mb-(--section-header-mb) flex flex-col items-center gap-(--section-header-gap) text-center">
			<span className="text-sm font-semibold uppercase tracking-wider text-(--chip-bg)">
				{eyebrow}
			</span>
			<h2
				id="testimonials-heading"
				className="text-(length:--section-heading-size) font-bold text-(--text-on-dark)"
			>
				{title}
			</h2>
			<p className="max-w-(--section-subtitle-max-w) text-base leading-relaxed text-(--text-muted)">
				{subtitle}
			</p>
		</div>
		<div className="grid grid-cols-1 gap-(--section-grid-gap) sm:grid-cols-2 lg:grid-cols-3">
			{items.map((item) => (
				<HomeTestimonialCard key={item.id} testimonial={item} />
			))}
		</div>
	</section>
)
