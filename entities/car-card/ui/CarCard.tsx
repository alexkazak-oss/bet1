import type { LandingCar } from '@/shared/content/landing-types'
import { Heart } from 'lucide-react'

type CarCardProps = {
	car: LandingCar
}

export const CarCard = ({ car }: CarCardProps) => (
	<div className="group flex flex-col overflow-hidden bg-(--l-bg) shadow-(--shadow-sm) transition hover:shadow-(--shadow-md)">
		<div className="relative flex items-center justify-center bg-linear-to-br from-(--l-accent-bg) to-(--l-accent-light) px-4 py-8">
			<button
				type="button"
				className="absolute right-3 top-3 rounded-(--radius-pill) p-1.5 text-(--l-text-lighter) transition hover:text-(--l-danger)"
				aria-label="Add to favorites"
			>
				<Heart className="size-5" />
			</button>
			<div className="text-sm font-medium text-(--l-accent-faint)">{car.image || '🚗 Car Image'}</div>
		</div>
		<div className="flex flex-1 flex-col gap-3 p-4">
			<h3 className="text-base font-bold text-(--l-text)">{car.title}</h3>
			<div className="mt-auto flex items-end justify-between">
				<p className="text-lg font-bold text-(--l-accent)">
					${car.price}
					<span className="text-sm font-normal text-(--l-text-faint)">{car.priceUnit}</span>
				</p>
				<button
					type="button"
					className="rounded-(--radius-pill) bg-(--l-accent) px-4 py-2 text-xs font-semibold text-(--l-bg) shadow-(--shadow-sm) transition hover:bg-(--l-accent-hover)"
				>
					Rent now
				</button>
			</div>
		</div>
	</div>
)
