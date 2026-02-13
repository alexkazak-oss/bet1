import type { ReactNode } from "react"

type ContainerProps = {
	children: ReactNode
}

// Универсальный контейнер, центрирует содержимое и задаёт отступы по токенам.
export const Container = ({ children }: ContainerProps) => (
	<div className="mx-auto justify-center items-center flex w/full max-w-(--container-max) flex-col gap-(--stack-gap) px-(--container-px) py-(--container-py)">
		{children}
	</div>
)
