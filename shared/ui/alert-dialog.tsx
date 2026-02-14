"use client"

import clsx from "clsx"
import {
	ButtonHTMLAttributes,
	HTMLAttributes,
	MouseEvent,
	MouseEventHandler,
	ReactElement,
	ReactNode,
	cloneElement,
	createContext,
	forwardRef,
	isValidElement,
	useContext,
	useEffect,
	useState,
} from "react"
import { createPortal } from "react-dom"

type AlertDialogContextValue = {
	open: boolean
	setOpen: (open: boolean) => void
	closeBlocked: boolean
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null)

const useAlertDialogContext = () => {
	const context = useContext(AlertDialogContext)
	if (!context) throw new Error("AlertDialog components must be used within <AlertDialog>")
	return context
}

const composeEventHandlers = <E extends { defaultPrevented: boolean }>(
	userHandler?: (event: E) => void,
	ourHandler?: (event: E) => void,
) => {
	return (event: E) => {
		userHandler?.(event)
		if (!event.defaultPrevented) ourHandler?.(event)
	}
}

type AlertDialogProps = {
	open?: boolean
	defaultOpen?: boolean
	onOpenChangeAction?: (open: boolean) => void
	closeBlocked?: boolean
	children: ReactNode
}

export const AlertDialog = ({ open, defaultOpen = false, onOpenChangeAction, closeBlocked = false, children }: AlertDialogProps) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen)
	const resolvedOpen = open ?? internalOpen

	const setOpen = (next: boolean) => {
		onOpenChangeAction?.(next)
		if (open === undefined) setInternalOpen(next)
	}

	return (
		<AlertDialogContext.Provider value={{ open: resolvedOpen, setOpen, closeBlocked }}>
			{children}
		</AlertDialogContext.Provider>
	)
}

type AlertDialogPortalProps = {
	children: ReactNode
}

export const AlertDialogPortal = ({ children }: AlertDialogPortalProps) => {
	const [mounted] = useState(() => typeof window !== "undefined")

	if (!mounted) return null
	return createPortal(children, document.body)
}

type AlertDialogOverlayProps = HTMLAttributes<HTMLDivElement>

export const AlertDialogOverlay = forwardRef<HTMLDivElement, AlertDialogOverlayProps>(
	({ className, ...props }, ref) => {
		const { open, setOpen, closeBlocked } = useAlertDialogContext()
		if (!open) return null

		return (
			<div
				ref={ref}
				{...props}
				className={clsx("fixed inset-0 z-40 bg-black/60 backdrop-blur-sm", className)}
				onClick={composeEventHandlers(props.onClick, () => {
					if (closeBlocked) return
					setOpen(false)
				})}
			/>
		)
	},
)
AlertDialogOverlay.displayName = "AlertDialogOverlay"

type AlertDialogContentProps = HTMLAttributes<HTMLDivElement>

export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
	({ className, children, ...props }, ref) => {
		const { open, setOpen, closeBlocked } = useAlertDialogContext()

		useEffect(() => {
			if (!open) return
			const onKeyDown = (event: KeyboardEvent) => {
				if (event.key === "Escape" && !closeBlocked) setOpen(false)
			}
			window.addEventListener("keydown", onKeyDown)
			return () => window.removeEventListener("keydown", onKeyDown)
		}, [open, setOpen, closeBlocked])

		if (!open) return null

		return (
			<AlertDialogPortal>
				<div className="fixed inset-0 z-50 flex items-center justify-center px-4">
					<AlertDialogOverlay />
					<div
						ref={ref}
						role="alertdialog"
						aria-modal="true"
						className={clsx(
							"relative z-50 w-full max-w-2xl rounded-(--radius-card) border border-(--border-subtle) bg-(--surface-card) p-6 text-(--text-primary) shadow-(--shadow-soft)",
							className,
						)}
						{...props}
					>
						{children}
					</div>
				</div>
			</AlertDialogPortal>
		)
	},
)
AlertDialogContent.displayName = "AlertDialogContent"

type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>

export const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
	<div className={clsx("flex flex-col gap-2 text-(--text-primary)", className)} {...props} />
)

AlertDialogHeader.displayName = "AlertDialogHeader"

type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>

export const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
	<div
		className={clsx(
			"mt-6 flex flex-col-reverse gap-3 text-(--text-primary) sm:flex-row sm:items-center sm:justify-end",
			className,
		)}
		{...props}
	/>
)

AlertDialogFooter.displayName = "AlertDialogFooter"

type AlertDialogTitleProps = HTMLAttributes<HTMLHeadingElement>

export const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
	({ className, ...props }, ref) => (
		<h2
			ref={ref}
			className={clsx("text-xl font-semibold leading-tight text-(--text-primary)", className)}
			{...props}
		/>
	),
)
AlertDialogTitle.displayName = "AlertDialogTitle"

type AlertDialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
	({ className, ...props }, ref) => (
		<p
			ref={ref}
			className={clsx("text-sm leading-relaxed text-(--text-muted)", className)}
			{...props}
		/>
	),
)
AlertDialogDescription.displayName = "AlertDialogDescription"

type AlertDialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
	children: ReactElement
}

export const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
	({ asChild, children, className, ...props }, ref) => {
		const { setOpen } = useAlertDialogContext()
		const handleClick = composeEventHandlers(props.onClick, () => setOpen(true))

		if (asChild && isValidElement(children)) {
			const typedChild = children as ReactElement<{ className?: string; onClick?: MouseEventHandler<HTMLElement> }>
			const handleClickForChild: MouseEventHandler<HTMLElement> = (event: MouseEvent<HTMLElement>) => {
				handleClick(event as unknown as MouseEvent<HTMLButtonElement>)
			}
			return cloneElement(typedChild, {
				...props,
				className: clsx(typedChild.props.className, className),
				onClick: composeEventHandlers<MouseEvent<HTMLElement>>(typedChild.props.onClick, handleClickForChild),
			})
		}

		return (
			<button
				ref={ref}
				type="button"
				{...props}
				className={className}
				onClick={handleClick}
			>
				{children}
			</button>
		)
	},
)
AlertDialogTrigger.displayName = "AlertDialogTrigger"

type AlertDialogActionProps = ButtonHTMLAttributes<HTMLButtonElement>

export const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
	({ className, ...props }, ref) => {
		const { setOpen } = useAlertDialogContext()
		return (
			<button
				ref={ref}
				type="button"
				className={clsx(
					"inline-flex h-10 items-center justify-center rounded-(--radius-pill) bg-(--text-primary) px-4 text-sm font-semibold text-(--text-on-dark) shadow-(--shadow-button) transition hover:opacity-90",
					className,
				)}
				{...props}
				onClick={composeEventHandlers(props.onClick, () => setOpen(false))}
			/>
		)
	},
)
AlertDialogAction.displayName = "AlertDialogAction"

type AlertDialogCancelProps = ButtonHTMLAttributes<HTMLButtonElement>

export const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
	({ className, ...props }, ref) => {
		const { setOpen } = useAlertDialogContext()
		return (
			<button
				ref={ref}
				type="button"
				className={clsx(
					"inline-flex h-10 items-center justify-center rounded-(--radius-pill) border border-(--border-subtle) bg-white/80 px-4 text-sm font-semibold text-(--text-primary) transition hover:bg-white",
					className,
				)}
				{...props}
				onClick={composeEventHandlers(props.onClick, () => setOpen(false))}
			/>
		)
	},
)
AlertDialogCancel.displayName = "AlertDialogCancel"
