import {
	POINTER_OFFSET_DEG,
	PRIZES,
	SAFE_MARGIN_RATIO,
	saveSpin,
} from '@/features/fortune-wheel'
import {NextResponse} from 'next/server'

const RATE_LIMIT_WINDOW_MS = 5000
const rateLimitByClient = new Map<string, number>()

export async function POST(request: Request) {
	const clientKey = getClientKey(request)
	const now = Date.now()
	const last = rateLimitByClient.get(clientKey)
	if (last && now - last < RATE_LIMIT_WINDOW_MS) {
		return NextResponse.json(
			{error: 'Too many spins. Try again soon.'},
			{status: 429},
		)
	}
	if (!PRIZES.length) {
		return NextResponse.json({error: 'No prizes configured.'}, {status: 500})
	}

	rateLimitByClient.set(clientKey, now)

	const prizeIndex = Math.floor(Math.random() * PRIZES.length)
	const angle = 360 / PRIZES.length
	const margin = angle * SAFE_MARGIN_RATIO
	const within = margin + Math.random() * (angle - 2 * margin)
	const target = prizeIndex * angle + within
	const rawStopAngle = 360 - (target + POINTER_OFFSET_DEG)
	const stopAngle = ((rawStopAngle % 360) + 360) % 360

	const spinId = crypto.randomUUID()
	saveSpin(spinId, PRIZES[prizeIndex].id, now)

	return NextResponse.json({spinId, stopAngle})
}

function getClientKey(request: Request) {
	const forwarded = request.headers
		.get('x-forwarded-for')
		?.split(',')[0]
		?.trim()
	const realIp = request.headers.get('x-real-ip')?.trim()
	return forwarded || realIp || 'anonymous'
}
