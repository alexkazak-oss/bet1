import type { LandingTestimonial } from '@/shared/content/landing-types'
import { Star } from 'lucide-react'

type TestimonialCardProps = {
	testimonial: LandingTestimonial
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
	<div className="flex flex-col gap-4 p-6 shadow-(--shadow-sm)">
		<div className="flex gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < testimonial.rating ? '' : ''}`}
				/>
			))}
		</div>
		<p className="flex-1 text-sm leading-relaxed text-(--l-text)">&ldquo;{testimonial.text}&rdquo;</p>
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-(--radius-pill)  text-xs font-bold">
				{testimonial.name.charAt(0)}
			</div>
			<div>
				<p className="text-sm font-semibold text-(--l-text)">{testimonial.name}</p>
				<p className="text-xs ">{testimonial.role}</p>
			</div>
		</div>
	</div>
)
