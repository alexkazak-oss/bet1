import {loadSpin, markClaimed, PRIZES} from '@/features/fortune-wheel'
import {NextResponse} from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const spinId = typeof body?.spinId === 'string' ? body.spinId : null
		if (!spinId) {
			return NextResponse.json({error: 'spinId is required'}, {status: 400})
		}

		const record = loadSpin(spinId)
		if (!record) {
			return NextResponse.json(
				{error: 'Unknown or expired spin'},
				{status: 404},
			)
		}
		if (record.status === 'claimed') {
			return NextResponse.json({error: 'Already claimed'}, {status: 409})
		}

		const prize = PRIZES.find((item) => item.id === record.prizeId)
		if (!prize) {
			return NextResponse.json({error: 'Prize not found'}, {status: 500})
		}

		const ok = markClaimed(spinId)
		if (!ok) {
			return NextResponse.json({error: 'Cannot claim'}, {status: 409})
		}

		return NextResponse.json({ok: true, prize})
	} catch (err) {
		return NextResponse.json({error: 'Invalid request'}, {status: 400})
	}
}
