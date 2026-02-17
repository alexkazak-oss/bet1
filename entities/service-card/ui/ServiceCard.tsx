import type { ServiceItem } from "@/shared/content/types"
import { Cloud, Code, Palette, Smartphone, Zap } from "lucide-react"
import type { ReactNode } from "react"

const iconMap: Record<string, ReactNode> = {
	Code: <Code className="size-7" />,
	Smartphone: <Smartphone className="size-7" />,
	Palette: <Palette className="size-7" />,
	Cloud: <Cloud className="size-7" />,
}

export const ServiceCard = ({ service }: { service: ServiceItem }) => (
	<article className="flex flex-col gap-4 rounded-(--radius-card) border border-(--border-subtle) bg-(--surface-card) p-(--section-padding) shadow-(--shadow-card) transition hover:shadow-(--shadow-soft)">
		<div className="flex size-12 items-center justify-center rounded-lg bg-(--chip-bg) text-(--text-primary)">
			{iconMap[service.icon] ?? <Zap className="size-7" />}
		</div>
		<h3 className="text-lg font-semibold text-(--text-primary)">
			{service.title}
		</h3>
		<p className="text-sm leading-relaxed text-(--text-secondary)">
			{service.description}
		</p>
	</article>
)
