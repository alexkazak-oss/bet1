import { StepCard } from '@/entities/step-card'
import type { LandingStep } from '@/shared/content/landing-types'
import { SectionHeading } from '@/shared/ui/landing'

type StepsSectionProps = {
	eyebrow: string
	title: string
	subtitle: string
	items: LandingStep[]
}

export const StepsSection = ({ eyebrow, title, subtitle, items }: StepsSectionProps) => (
	<section className="bg-(--l-bg) py-(--l-section-py)" id="solutions">
		<div className="mx-auto flex max-w-(--l-max-w) flex-col items-center gap-12 px-(--l-px)">
			<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

			<div className="relative grid w-full grid-cols-1 gap-10 md:grid-cols-3">
				{/* Decorative connectors */}
				<svg
					className="pointer-events-none absolute left-0 top-8 hidden w-full md:block"
					viewBox="0 0 1200 40"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M200 20 C300 5, 400 35, 500 20 S700 5, 800 20 S1000 35, 1000 20"
						stroke="var(--l-border-accent)"
						strokeWidth="2"
						strokeDasharray="6 4"
					/>
				</svg>
				{items.map((step, i) => (
					<StepCard key={step.title} step={step} index={i} />
				))}
			</div>
		</div>
	</section>
)
