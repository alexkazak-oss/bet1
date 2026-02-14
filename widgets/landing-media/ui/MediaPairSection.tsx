import { Placeholder } from '@/shared/ui/landing'

export const MediaPairSection = () => (
	<section className="bg-gray-50 py-16 md:py-24">
		<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 md:grid-cols-2">
			<Placeholder label="Video / Gallery 1" className="min-h-64 md:min-h-80" />
			<Placeholder label="Video / Gallery 2" className="min-h-64 md:min-h-80" />
		</div>
	</section>
)
