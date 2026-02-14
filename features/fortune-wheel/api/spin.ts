import {fetchJson} from '@/shared/api/client'
import type {
	ClaimResponse,
	Prize,
	RevealResponse,
	SpinResponse,
} from '../model/types'

export async function spin(): Promise<SpinResponse> {
	return fetchJson<SpinResponse>('/api/fortune/spin', {method: 'POST'})
}

export async function reveal(spinId: string): Promise<{prize: Prize}> {
	return fetchJson<RevealResponse>('/api/fortune/reveal', {
		method: 'POST',
		body: JSON.stringify({spinId}),
	})
}

export async function claim(spinId: string): Promise<ClaimResponse> {
	return fetchJson<ClaimResponse>('/api/fortune/claim', {
		method: 'POST',
		body: JSON.stringify({spinId}),
	})
}
