import type {LandingContent} from './landing-types'

export const landingContent: LandingContent = {
	nav: [
		{label: 'Home', href: '#'},
		{label: 'Features', href: '#features'},
		{label: 'Solutions', href: '#solutions'},
		{label: 'Resources', href: '#resources'},
		{label: 'Pricing', href: '#pricing'},
	],
	hero: {
		eyebrow: 'Best Car Rental in Town',
		title: 'Find, book and rent a car easily',
		description:
			'Get a car wherever and whenever you need it with the best prices and top-quality vehicles available in just a few clicks.',
		ctaPrimary: 'Get Started',
		ctaSecondary: 'Learn More',
	},
	searchBar: {
		placeholder: 'Search...',
		buttonLabel: 'Search',
	},
	steps: {
		eyebrow: 'How it works',
		title: 'Rent with the following 3 working steps',
		subtitle:
			'Simple, transparent, and hassle-free. We make renting a car as easy as 1-2-3.',
		items: [
			{
				icon: 'MapPin',
				title: 'Choose a location',
				description:
					'Pick your preferred location and find the best car available near you.',
			},
			{
				icon: 'CalendarDays',
				title: 'Pick-up date',
				description:
					'Select your desired pick-up date and time to reserve the car.',
			},
			{
				icon: 'Car',
				title: 'Book your car',
				description:
					'Complete your booking with our secure checkout and hit the road.',
			},
		],
	},
	catalog: {
		eyebrow: 'Our Fleet',
		title: 'The most popular cars for rent',
		subtitle:
			'Explore a wide range of cars suited for every occasion — from quick city rides to premium road trips.',
		tabs: ['Popular', 'Large Car', 'Small Car', 'Premium Car'],
		cars: [
			{
				id: '1',
				title: 'Koenigsegg',
				image: '',
				price: 99,
				priceUnit: '/day',
				category: 'Popular',
			},
			{
				id: '2',
				title: 'Nissan GT-R',
				image: '',
				price: 80,
				priceUnit: '/day',
				category: 'Popular',
			},
			{
				id: '3',
				title: 'Rolls-Royce',
				image: '',
				price: 96,
				priceUnit: '/day',
				category: 'Premium Car',
			},
			{
				id: '4',
				title: 'All New Rush',
				image: '',
				price: 72,
				priceUnit: '/day',
				category: 'Large Car',
			},
			{
				id: '5',
				title: 'CR-V',
				image: '',
				price: 80,
				priceUnit: '/day',
				category: 'Large Car',
			},
			{
				id: '6',
				title: 'MG ZX Exclusive',
				image: '',
				price: 74,
				priceUnit: '/day',
				category: 'Small Car',
			},
			{
				id: '7',
				title: 'New MG ZS',
				image: '',
				price: 80,
				priceUnit: '/day',
				category: 'Small Car',
			},
			{
				id: '8',
				title: 'MG ZX Excite',
				image: '',
				price: 74,
				priceUnit: '/day',
				category: 'Small Car',
			},
		],
		discoverLabel: 'Discover all vehicles →',
	},
	feature: {
		eyebrow: 'Why choose us',
		title: 'We offer the best experience with our rental deals',
		subtitle:
			'Our commitment goes beyond just renting cars — we provide a premium experience every time.',
		items: [
			{
				icon: 'DollarSign',
				title: 'Best price guaranteed',
				description:
					"Find a lower price? We'll match it. Enjoy the best rates with no hidden fees.",
			},
			{
				icon: 'Headphones',
				title: '24/7 customer support',
				description:
					'Our expert team is available around the clock to help you at every step.',
			},
			{
				icon: 'ShieldCheck',
				title: 'Secure transactions',
				description:
					'Your payment information is fully protected with enterprise-grade encryption.',
			},
		],
	},
	testimonials: {
		eyebrow: 'Testimonials',
		title: 'Trusted by thousands of happy customers',
		subtitle:
			'See what our customers have to say about their experience with us.',
		items: [
			{
				id: '1',
				name: 'Alex Johnson',
				role: 'Business traveler',
				avatar: '',
				text: 'Fantastic service! The car was in perfect condition and the booking process was seamless. Highly recommend!',
				rating: 5,
			},
			{
				id: '2',
				name: 'Sarah Williams',
				role: 'Tourist',
				avatar: '',
				text: 'Best car rental experience ever. Great prices, clean cars, and wonderful customer service from start to finish.',
				rating: 5,
			},
			{
				id: '3',
				name: 'Mike Chen',
				role: 'Freelancer',
				avatar: '',
				text: 'I use this service every month for my road trips. Reliable, affordable, and always a pleasure to deal with.',
				rating: 4,
			},
		],
	},
	footer: {
		brand: 'MORENT',
		tagline:
			'Our vision is to provide convenience and help increase your sales business.',
		columns: [
			{
				title: 'About',
				links: [
					{label: 'How it works', href: '#'},
					{label: 'Featured', href: '#'},
					{label: 'Partnership', href: '#'},
					{label: 'Business Relation', href: '#'},
				],
			},
			{
				title: 'Community',
				links: [
					{label: 'Events', href: '#'},
					{label: 'Blog', href: '#'},
					{label: 'Podcast', href: '#'},
					{label: 'Invite a friend', href: '#'},
				],
			},
			{
				title: 'Socials',
				links: [
					{label: 'Discord', href: '#'},
					{label: 'Instagram', href: '#'},
					{label: 'Twitter', href: '#'},
					{label: 'Facebook', href: '#'},
				],
			},
		],
		copyright: '©2026 MORENT. All rights reserved.',
		bottomLinks: [
			{label: 'Privacy & Policy', href: '#'},
			{label: 'Terms & Conditions', href: '#'},
		],
	},
}
