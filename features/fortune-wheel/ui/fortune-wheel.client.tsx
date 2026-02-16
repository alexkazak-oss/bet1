"use client"

import clsx from "clsx"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type TransitionEvent } from "react"
import { claim, reveal, spin } from "../api"
import { PRIZES } from "../model/constants"
import type { Phase } from "../model/state"
import type { Prize } from "../model/types"

export type FortuneWheelCopy = {
	spinLabel: string
	spinningLabel: string
	idleStatus: string
	spinningStatus: string
	resultPrefix: string
	claimLabel: string
	claimingLabel: string
}

export type FortuneWheelClientProps = {
	copy: FortuneWheelCopy
	phase: Phase
	setPhaseAction: (phase: Phase) => void
	onSpinningStartAction?: () => void
	onSpinningEndAction?: (prize: Prize) => void
	onClaimRequestedAction?: (spinId: string) => void
	onCloseAction: () => void
	redirectBase: string
}

const EXTRA_TURNS_BASE = 5
const EXTRA_TURNS_VARIANCE = 3
const SPIN_DURATION_MS = 3200
const WHEEL_SIZE = 320

export const FortuneWheelClient = ({
	copy,
	phase,
	setPhaseAction,
	onSpinningStartAction,
	onSpinningEndAction,
	onClaimRequestedAction,
	onCloseAction,
	redirectBase,
}: FortuneWheelClientProps) => {
	// const router = useRouter()
	const [rotation, setRotation] = useState(0)
	const [prizeLabel, setPrizeLabel] = useState<string | null>(null)
	const [prizeId, setPrizeId] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [hasSpun, setHasSpun] = useState(false)

	const activeSpinIdRef = useRef<string | null>(null)
	const spinSeqRef = useRef(0)
	const revealPendingRef = useRef(false)
	const phaseRef = useRef<Phase>(phase)
	const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		phaseRef.current = phase
	}, [phase])

	useEffect(() => {
		return () => {
			if (fallbackTimerRef.current) {
				clearTimeout(fallbackTimerRef.current)
			}
		}
	}, [])

	const slotAngle = 360 / PRIZES.length
	const radius = WHEEL_SIZE / 2
	const labelRadius = radius - 26
	const gradient = useMemo(() => {
		const palette = ["#f59e0b", "#f97316", "#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#14b8a6"]
		return `conic-gradient(${PRIZES.map((_, index) => {
			const start = (index / PRIZES.length) * 360
			const end = ((index + 1) / PRIZES.length) * 360
			const color = palette[index % palette.length]
			return `${color} ${start}deg ${end}deg`
		}).join(", ")})`
	}, [])

	const doReveal = useCallback(async () => {
		if (!revealPendingRef.current) return
		revealPendingRef.current = false

		if (fallbackTimerRef.current) {
			clearTimeout(fallbackTimerRef.current)
			fallbackTimerRef.current = null
		}

		const spinId = activeSpinIdRef.current
		const seqAtReveal = spinSeqRef.current
		if (!spinId) {
			setPhaseAction("idle")
			return
		}

		try {
			const { prize } = await reveal(spinId)
			if (spinId !== activeSpinIdRef.current || seqAtReveal !== spinSeqRef.current) return
			setPrizeLabel(prize.label)
			setPrizeId(prize.id)
			onSpinningEndAction?.(prize)
			setPhaseAction("ready")
		} catch (err) {
			setError(err instanceof Error ? err.message : "Reveal failed")
			setPhaseAction("idle")
		}
	}, [onSpinningEndAction, setPhaseAction])

	const handleSpin = async () => {
		if (phase !== "idle" || hasSpun) return
		if (!PRIZES.length) {
			setError("No prizes configured")
			return
		}

		setPrizeLabel(null)
		setPrizeId(null)
		setError(null)
		setHasSpun(true)
		setPhaseAction("spinning")
		onSpinningStartAction?.()

		const seq = spinSeqRef.current + 1
		spinSeqRef.current = seq

		try {
			const { spinId, stopAngle } = await spin()
			if (seq !== spinSeqRef.current) return

			activeSpinIdRef.current = spinId
			revealPendingRef.current = true

			const extraTurns = EXTRA_TURNS_BASE + Math.floor(Math.random() * EXTRA_TURNS_VARIANCE)
			setRotation((prev) => {
				const baseRotation = prev % 360
				return baseRotation + extraTurns * 360 + stopAngle
			})

			// Safety fallback: if transitionend doesn't fire, reveal after timeout
			fallbackTimerRef.current = setTimeout(() => {
				fallbackTimerRef.current = null
				if (revealPendingRef.current && phaseRef.current === "spinning") {
					void doReveal()
				}
			}, SPIN_DURATION_MS + 500)
		} catch (err) {
			setError(err instanceof Error ? err.message : "Spin failed")
			revealPendingRef.current = false
			setPhaseAction("idle")
		}
	}

	const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) return
		if (event.propertyName !== "transform") return
		if (!revealPendingRef.current) return
		if (phaseRef.current !== "spinning") return
		void doReveal()
	}

	const handleClaim = async () => {
		const spinId = activeSpinIdRef.current
		if (!spinId || phase !== "ready" || !prizeId) return
		setPhaseAction("claiming")
		try {
			onClaimRequestedAction?.(spinId)
			await claim(spinId)
			const target = `${redirectBase}?prize=${encodeURIComponent(prizeId)}`
			setPhaseAction("claimed")
			onCloseAction()
			window.open(target, "_blank", "noopener,noreferrer")
		} catch (err) {
			setError(err instanceof Error ? err.message : "Claim failed")
			setPhaseAction("ready")
		}
	}

	const handlePrizeClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		await handleClaim()
	}


	return (
		<div className="flex flex-col gap-4">
			<div className="relative flex items-center justify-center">
				<div className="pointer-events-none absolute -top-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-1 text-center">
					<div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-(--text-primary) bg-(--surface-card) shadow-(--shadow-card)">
						<div className="h-2 w-2 rounded-full bg-(--text-primary)" />
					</div>
					<div className="h-0 w-0 border-x-6 border-x-transparent border-b-10 border-b-(--text-primary)" />
				</div>
				<div className="relative flex items-center justify-center" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
					<div
						className="absolute inset-0 overflow-hidden rounded-full border-4 border-(--border-subtle) bg-white/80 shadow-(--shadow-soft)"
					>
						<div
							className="absolute inset-0 rounded-full"
							style={{
								transform: `rotate(${rotation}deg)`,
								transition:
									phase === "spinning"
										? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
										: undefined,
								willChange: "transform",
								background: gradient,
							}}
							onTransitionEnd={handleTransitionEnd}
						>
							<div className="absolute inset-0">
								{PRIZES.map((prize, index) => {
									const mid = slotAngle * index + slotAngle / 2
									const flip = mid > 90 && mid < 270 ? 0 : 0 // Поворот по оси предмета внутри сегмента
									return (
										<div
											key={prize.id}
											className="absolute left-1/2 top-1/2"
											style={{
												transform: `translate(-50%, -50%) rotate(${mid}deg) translateY(-${labelRadius}px) rotate(${flip}deg)`,
												transformOrigin: "center",
											}}
										>
											<span
												className="inline-flex max-w-30 -translate-y-1/2 px-2 py-1 rounded-(--radius-pill) bg-white/85 text-[10px] font-semibold leading-tight text-(--text-primary) shadow-(--shadow-card) whitespace-nowrap"
												title={prize.label}
											>
												{prize.label}
											</span>
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className="absolute flex items-center justify-center inset-[22%] z-10 rounded-full border border-(--border-subtle) bg-(--surface-card) px-6 py-4 text-center text-sm font-semibold text-(--text-primary) shadow-(--shadow-card)">
						{phase === "ready" && prizeId && prizeLabel ? (
							<Link
								href={`${redirectBase}?prize=${encodeURIComponent(prizeId)}`}
								onClick={handlePrizeClick}
								target="_blank"
								rel="noopener noreferrer"
								className="prize-claim-btn pointer-events-auto inline-flex items-center w-full h-full justify-center rounded-full bg-(--chip-bg) px-4 py-2 text-3xl font-semibold text-(--text-on-dark) shadow-(--shadow-button) transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-primary)"
							>
								{`${copy.claimLabel}: ${prizeLabel}`}
							</Link>
						) : null}
						{phase === "spinning" || phase === "claiming" ? (
							<span className="block text-(--text-primary)">
								{copy.spinningStatus}
							</span>
						) : null}
					</div>
					{phase === "claiming" && prizeLabel ? (
						<div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center">
							<button
								type="button"
								className="rounded-(--radius-pill) bg-(--text-primary) px-4 py-2 text-sm font-semibold text-(--text-on-dark) opacity-70 shadow-(--shadow-button)"
								disabled
							>
								{`${copy.claimingLabel}: ${prizeLabel}`}
							</button>
						</div>
					) : null}
					{phase === "claimed" && prizeLabel ? (
						<div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center">
							<div className="rounded-(--radius-pill) bg-(--surface-card) px-4 py-2 text-sm font-semibold text-(--text-primary) shadow-(--shadow-card)">
								{prizeLabel}
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className="flex flex-col items-center gap-2">
				{phase === "idle" && !hasSpun ? (
					<button
						type="button"
						className={clsx(
							"inline-flex h-11 items-center justify-center rounded-(--radius-pill) bg-(--text-primary) px-5 text-sm font-semibold text-(--text-on-dark) shadow-(--shadow-button) transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-primary)",
							"disabled:cursor-not-allowed disabled:opacity-60",
						)}
						onClick={handleSpin}
					>
						{copy.spinLabel}
					</button>
				) : null}
				{error ? <p className="text-sm text-(--text-danger)">{error}</p> : null}
				{prizeLabel && phase !== "idle" ? (
					<div className="text-sm font-semibold text-(--text-primary)">
						{copy.resultPrefix} <span className="text-(--text-secondary)">{prizeLabel}</span>
					</div>
				) : null}
			</div>
		</div>
	)
}
