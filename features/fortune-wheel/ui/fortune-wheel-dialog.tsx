"use client"

import { DEFAULT_LOCALE, type Locale } from "@/shared/config/i18n"
import { getBaseUrl } from "@/shared/config/site"
import { getFeatures } from "@/shared/content"
import type { FortuneWheelContent } from "@/shared/content/types"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/ui/alert-dialog"
import { NeonButton } from "@/shared/ui/NeonButton"
import dynamic from "next/dynamic"
import { Suspense, useCallback, useMemo, useState } from "react"
import type { Phase } from "../model/state"
import type { Prize } from "../model/types"
import type { FortuneWheelClientProps } from "./fortune-wheel.client"

type FortuneWheelDialogProps = {
	locale?: Locale
	copyOverride?: FortuneWheelContent
	onResultAction?: (prize: Prize) => void
}

const lazyWheelImport = () => import("./fortune-wheel.client").then((mod) => mod.FortuneWheelClient)
const LazyFortuneWheel = dynamic<FortuneWheelClientProps>(lazyWheelImport, { ssr: false })

export const FortuneWheelDialog = ({ locale = DEFAULT_LOCALE, copyOverride, onResultAction }: FortuneWheelDialogProps) => {
	const [open, setOpen] = useState(false)
	const [phase, setPhase] = useState<Phase>("idle")
	const featureTexts = copyOverride ?? getFeatures(locale).fortuneWheel
	const locked = phase === "spinning" || phase === "claiming"
	const redirectBase = getBaseUrl()

	const wheelCopy = useMemo(
		() => ({
			spinLabel: featureTexts.spinLabel,
			spinningLabel: featureTexts.spinningLabel,
			idleStatus: featureTexts.idleStatus,
			spinningStatus: featureTexts.spinningStatus,
			resultPrefix: featureTexts.resultPrefix,
			claimLabel: featureTexts.claimLabel,
			claimingLabel: featureTexts.claimingLabel,
		}),
		[featureTexts],
	)

	const prefetchWheel = useCallback(() => {
		void lazyWheelImport()
	}, [])

	const handleOpenChange = (next: boolean) => {
		if (locked && !next) return
		setOpen(next)
		if (!next) {
			setPhase("idle")
		}
	}

	const handleSpinningEnd = (prize: Prize) => {
		onResultAction?.(prize)
	}

	return (
		<AlertDialog open={open} onOpenChangeAction={handleOpenChange} closeBlocked={locked}>
			<AlertDialogTrigger asChild>
				<NeonButton
					type="button"
					redirectDisabled
					className="size-18 md:size-28 rounded-full p-0 shadow-(--shadow-button) transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
					onPointerEnter={prefetchWheel}
					bgImageSrc="/elements/fortune-wheel/wheel-button.svg"
				/>
			</AlertDialogTrigger>
			<AlertDialogContent className="block h-auto max-h-(80vh) overflow-hidden">
				<AlertDialogHeader>
					<AlertDialogTitle>{featureTexts.title}</AlertDialogTitle>
					<AlertDialogDescription>{featureTexts.description}</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="mt-4">
					{open ? (
						<Suspense fallback={
							<div className="flex h-80 w-full items-center justify-center rounded-(--radius-card) border border-(--border-subtle) bg-(--surface-card) text-(--text-primary)">
								{featureTexts.loading}
							</div>
						}>
							<LazyFortuneWheel
								copy={wheelCopy}
								phase={phase}
								setPhaseAction={setPhase}
								onSpinningEndAction={handleSpinningEnd}
								onCloseAction={() => handleOpenChange(false)}
								redirectBase={redirectBase}
							/>
						</Suspense>
					) : null}
				</div>
				{!locked && (phase === "idle" || phase === "claimed") ? (
					<AlertDialogFooter>
						<button
							type="button"
							className="inline-flex h-10 items-center justify-center rounded-(--radius-pill) bg-(--surface-card) px-4 text-sm font-semibold text-(--text-primary) shadow-(--shadow-button)"
							onClick={() => handleOpenChange(false)}
						>
							{phase === "claimed" ? featureTexts.doneLabel : featureTexts.closeLabel}
						</button>
					</AlertDialogFooter>
				) : null}
			</AlertDialogContent>
		</AlertDialog>
	)
}
