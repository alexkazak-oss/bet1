"use client"

import { FortuneWheelDialog } from "@/features/fortune-wheel"
import type { Locale } from "@/shared/config/i18n"
import type { FortuneWheelContent } from "@/shared/content/types"

type FortuneWheelFloatProps = {
	locale: Locale
	fortuneWheel: FortuneWheelContent
}

export const FortuneWheelFloat = ({ locale, fortuneWheel }: FortuneWheelFloatProps) => (
	<div className="fixed bottom-6 md:bottom-10 right-6 z-50">
		<FortuneWheelDialog locale={locale} copyOverride={fortuneWheel} />
	</div>
)
