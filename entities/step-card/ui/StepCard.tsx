import type { LandingStep } from '@/shared/content/landing-types'
import { CalendarDays, Car, DollarSign, Headphones, MapPin, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
	MapPin: <MapPin className="size-6" />,
	CalendarDays: <CalendarDays className="size-6" />,
	Car: <Car className="size-6" />,
	DollarSign: <DollarSign className="size-6" />,
	Headphones: <Headphones className="size-6" />,
	ShieldCheck: <ShieldCheck className="size-6" />,
}

type StepCardProps = {
	step: LandingStep
	index: number
}

export const StepCard = ({ step, index }: StepCardProps) => (
	<div className="flex flex-col items-center gap-4 text-center">
		<div className="flex size-16 items-center justify-center rounded-(--radius-pill) bg-(--l-accent-light) text-(--l-accent)">
			{iconMap[step.icon] ?? <span className="text-lg font-bold">{index + 1}</span>}
		</div>
		<h3 className="text-lg font-bold text-(--l-text)">{step.title}</h3>
		<p className="max-w-xs text-sm leading-relaxed text-(--l-text-muted)">{step.description}</p>
	</div>
)
