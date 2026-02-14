import { TestimonialCard } from '@/entities/testimonial-card'
import type { LandingTestimonial } from '@/shared/content/landing-types'
import { SectionHeading } from '@/shared/ui/landing'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type TestimonialsSectionProps = {
	eyebrow: string
	title: string
	subtitle: string
	items: LandingTestimonial[]
}

export const TestimonialsSection = ({ eyebrow, title, subtitle, items }: TestimonialsSectionProps) => (
	<section className="bg-white py-16 md:py-24">
		<div className="mx-auto flex max-w-6xl flex-col gap-12 px-5">
			<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
				<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
				<div className="flex gap-2">
					<button
						type="button"
						className="flex size-10 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
						aria-label="Previous testimonial"
					>
						<ChevronLeft className="size-5" />
					</button>
					<button
						type="button"
						className="flex size-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
						aria-label="Next testimonial"
					>
						<ChevronRight className="size-5" />
					</button>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((t) => (
					<TestimonialCard key={t.id} testimonial={t} />
				))}
			</div>
			<div className="flex items-center justify-center gap-2">
				{items.map((_, i) => (
					<span
						key={i}
						className={`block size-2.5 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-gray-200'}`}
					/>
				))}
			</div>
		</div>
	</section>
)
