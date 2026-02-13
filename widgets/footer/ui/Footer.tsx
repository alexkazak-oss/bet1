import type { FooterContent } from "@/shared/content/types"

type FooterProps = {
	content: FooterContent
}

// Отображает футер с контактами и копирайтом для текущей локали.
export const Footer = ({ content }: FooterProps) => (
	<footer className="border-t border-(--border-subtle) bg-(--surface-card) backdrop-blur-md">
		<div className="mx-auto flex w/full max-w-(--container-max) flex-col gap-(--footer-gap) px-(--footer-px) py-(--footer-py) text-sm text-(--text-secondary)">
			<p>{content.copyright}</p>
			<p>{content.contact}</p>
		</div>
	</footer>
)
