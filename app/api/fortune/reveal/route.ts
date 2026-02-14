import {loadSpin, PRIZES} from '@/features/fortune-wheel'
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

		const prize = PRIZES.find((item) => item.id === record.prizeId)
		if (!prize) {
			return NextResponse.json({error: 'Prize not found'}, {status: 500})
		}

		return NextResponse.json({prize})
	} catch (err) {
		return NextResponse.json({error: 'Invalid request'}, {status: 400})
	}
}
