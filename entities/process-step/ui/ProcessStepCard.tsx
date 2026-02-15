import type { ProcessStep } from "@/shared/content/types"

export const ProcessStepCard = ({ step }: { step: ProcessStep }) => (
	<div className="flex flex-col items-center gap-4 text-center">
		<div className="flex size-14 items-center justify-center rounded-(--radius-pill) bg-(--chip-bg) text-(--text-primary)">
			<span className="text-xl font-bold">{step.step}</span>
		</div>
		<h3 className="text-lg font-bold text-(--text-on-dark)">{step.title}</h3>
		<p className="max-w-xs text-sm leading-relaxed text-(--text-muted)">
			{step.description}
		</p>
	</div>
)
