type SpinStatus = 'spun' | 'claimed'

type SpinRecord = {
	prizeId: string
	createdAt: number
	status: SpinStatus
}

const spinStore = new Map<string, SpinRecord>()
const SPIN_TTL_MS = 15 * 60 * 1000

export function saveSpin(spinId: string, prizeId: string, createdAt: number) {
	spinStore.set(spinId, {prizeId, createdAt, status: 'spun'})
	cleanupExpired(createdAt)
}

export function loadSpin(spinId: string) {
	const record = spinStore.get(spinId)
	if (!record) return null
	if (Date.now() - record.createdAt > SPIN_TTL_MS) {
		spinStore.delete(spinId)
		return null
	}
	return record
}

export function markClaimed(spinId: string) {
	const record = spinStore.get(spinId)
	if (!record) return false
	if (Date.now() - record.createdAt > SPIN_TTL_MS) {
		spinStore.delete(spinId)
		return false
	}
	if (record.status === 'claimed') return false
	spinStore.set(spinId, {...record, status: 'claimed'})
	return true
}

function cleanupExpired(now: number) {
	for (const [key, value] of spinStore) {
		if (now - value.createdAt > SPIN_TTL_MS) {
			spinStore.delete(key)
		}
	}
}
