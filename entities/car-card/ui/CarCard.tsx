import type { LandingCar } from '@/shared/content/landing-types'
import { Heart } from 'lucide-react'

type CarCardProps = {
	car: LandingCar
}

export const CarCard = ({ car }: CarCardProps) => (
	<div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md">
		<div className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8">
			<button
				type="button"
				className="absolute right-3 top-3 rounded-full p-1.5 text-gray-300 transition hover:text-red-400"
				aria-label="Add to favorites"
			>
				<Heart className="size-5" />
			</button>
			<div className="text-sm font-medium text-blue-300">{car.image || '🚗 Car Image'}</div>
		</div>
		<div className="flex flex-1 flex-col gap-3 p-4">
			<h3 className="text-base font-bold text-gray-900">{car.title}</h3>
			<div className="mt-auto flex items-end justify-between">
				<p className="text-lg font-bold text-blue-600">
					${car.price}
					<span className="text-sm font-normal text-gray-400">{car.priceUnit}</span>
				</p>
				<button
					type="button"
					className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
				>
					Rent now
				</button>
			</div>
		</div>
	</div>
)
