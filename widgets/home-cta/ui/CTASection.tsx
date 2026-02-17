import type { CTAContent } from "@/shared/content/types"
import { NeonButton } from "@/shared/ui/NeonButton"

export const CTASection = ({
	heading,
	subtext,
	buttonLabel,
}: CTAContent) => (
	<section
		aria-labelledby="cta-heading"
		className="w-full rounded-(--radius-hero) bg-(--surface-hero) px-(--hero-px) py-12 text-center"
	>
		<div className="mx-auto flex max-w-(--section-subtitle-max-w) flex-col items-center gap-6">
			<h2
				id="cta-heading"
				className="text-(length:--section-heading-size) font-bold text-(--text-on-dark)"
			>
				{heading}
			</h2>
			<p className="text-base leading-relaxed text-(--text-muted)">
				{subtext}
			</p>
			<NeonButton>{buttonLabel}</NeonButton>
		</div>
	</section>
)
