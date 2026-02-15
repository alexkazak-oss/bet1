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
						className={`rounded-(--radius-pill) px-5 py-2 text-sm font-medium transition ${active === tab
							? 'bg-(--l-accent) text-(--l-bg) shadow-(--shadow-sm)'
							: 'bg-(--l-border) text-(--l-text-secondary) hover:bg-(--l-inactive)'
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
				className="text-sm font-semibold text-(--l-accent) transition hover:text-(--l-accent-hover)"
			>
				{discoverLabel}
			</a>
		</div>
	)
}
