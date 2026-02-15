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
	<section className="bg-(--l-bg) py-(--l-section-py)">
		<div className="mx-auto flex max-w-(--l-max-w) flex-col gap-12 px-(--l-px)">
			<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
				<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
				<div className="flex gap-2">
					<button
						type="button"
						className="flex size-10 items-center justify-center rounded-(--radius-pill) bg-(--l-bg) text-(--l-text-faint) shadow-(--shadow-sm) transition hover:bg-(--l-accent-bg) hover:text-(--l-accent)"
						aria-label="Previous testimonial"
					>
						<ChevronLeft className="size-5" />
					</button>
					<button
						type="button"
						className="flex size-10 items-center justify-center rounded-(--radius-pill) bg-(--l-accent) text-(--l-bg) shadow-(--shadow-sm) transition hover:bg-(--l-accent-hover)"
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
						className={`block size-2.5 rounded-(--radius-pill) ${i === 0 ? 'bg-(--l-accent)' : 'bg-(--l-inactive)'}`}
					/>
				))}
			</div>
		</div>
	</section>
)
