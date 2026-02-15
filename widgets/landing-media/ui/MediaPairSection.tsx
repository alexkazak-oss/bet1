import { Placeholder } from '@/shared/ui/landing'

export const MediaPairSection = () => (
	<section className="bg-(--l-bg-alt) py-(--l-section-py)">
		<div className="mx-auto grid max-w-(--l-max-w) grid-cols-1 gap-6 px-(--l-px) md:grid-cols-2">
			<Placeholder label="Video / Gallery 1" className="min-h-64 md:min-h-80" />
			<Placeholder label="Video / Gallery 2" className="min-h-64 md:min-h-80" />
		</div>
	</section>
)
