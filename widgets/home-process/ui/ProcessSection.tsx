import { ProcessStepCard } from "@/entities/process-step-card"
import type { ProcessStep } from "@/shared/content/types"

type ProcessSectionProps = {
	eyebrow: string
	title: string
	subtitle: string
	steps: ProcessStep[]
}

export const ProcessSection = ({
	eyebrow,
	title,
	subtitle,
	steps,
}: ProcessSectionProps) => (
	<section aria-labelledby="process-heading" className="w-full">
		<div className="mb-(--section-header-mb) flex flex-col items-center gap-(--section-header-gap) text-center">
			<span className="text-sm font-semibold uppercase tracking-wider text-(--chip-bg)">
				{eyebrow}
			</span>
			<h2
				id="process-heading"
				className="text-(length:--section-heading-size) font-bold text-(--text-on-dark)"
			>
				{title}
			</h2>
			<p className="max-w-(--section-subtitle-max-w) text-base leading-relaxed text-(--text-muted)">
				{subtitle}
			</p>
		</div>
		<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
			{steps.map((step) => (
				<ProcessStepCard key={step.step} step={step} />
			))}
		</div>
	</section>
)
