"use client"

import { CarCard } from '@/entities/car-card'
import type { LandingCar } from '@/shared/content/landing-types'
import { useState } from 'react'

type CatalogTabsProps = {
	tabs: string[]
	cars: LandingCar[]
	discoverLabel: string
}

export const CatalogTabs = ({ tabs, cars, discoverLabel }: CatalogTabsProps) => {
	const [active, setActive] = useState(tabs[0])

	const filtered = cars.filter((c) => c.category === active)
	const display = filtered.length > 0 ? filtered : cars

	return (
		<div className="flex flex-col items-center gap-8">
			<div className="flex flex-wrap justify-center gap-2">
				{tabs.map((tab) => (
					<button
						key={tab}
						type="button"
						onClick={() => setActive(tab)}
						className={`rounded-full px-5 py-2 text-sm font-medium transition ${active === tab
								? 'bg-blue-600 text-white shadow-sm'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
							}`}
					>
						{tab}
					</button>
				))}
			</div>
			<div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{display.map((car) => (
					<CarCard key={car.id} car={car} />
				))}
			</div>
			<a
				href="#"
				className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
			>
				{discoverLabel}
			</a>
		</div>
	)
}
