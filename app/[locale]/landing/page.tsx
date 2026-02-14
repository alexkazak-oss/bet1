import { LandingPage } from '@/pages/landing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'MORENT — Find, Book and Rent a Car Easily',
	description:
		'Get a car wherever and whenever you need it with the best prices and top-quality vehicles.',
}

export default function LandingRoute() {
	return <LandingPage />
}
