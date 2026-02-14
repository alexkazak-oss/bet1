import type { LandingTestimonial } from '@/shared/content/landing-types'
import { Star } from 'lucide-react'

type TestimonialCardProps = {
	testimonial: LandingTestimonial
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
	<div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
		<div className="flex gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
				/>
			))}
		</div>
		<p className="flex-1 text-sm leading-relaxed text-gray-600">&ldquo;{testimonial.text}&rdquo;</p>
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-xs font-bold text-blue-600">
				{testimonial.name.charAt(0)}
			</div>
			<div>
				<p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
				<p className="text-xs text-gray-400">{testimonial.role}</p>
			</div>
		</div>
	</div>
)
