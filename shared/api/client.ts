export async function fetchJson<T>(
	url: string,
	init?: RequestInit,
): Promise<T> {
	const response = await fetch(url, {
		...init,
		headers: {
			'Content-Type': 'application/json',
			...(init?.headers ?? {}),
		},
	})

	if (!response.ok) {
		const message = await safeErrorMessage(response)
		throw new Error(message)
	}

	const contentType = response.headers.get('content-type')
	if (contentType && contentType.includes('application/json')) {
		return (await response.json()) as T
	}

	throw new Error('Unexpected response format')
}

async function safeErrorMessage(response: Response): Promise<string> {
	try {
		const data = await response.json()
		if (data && typeof data === 'object' && 'error' in data) {
			return String((data as {error?: string}).error ?? 'Request failed')
		}
	} catch (err) {
		// ignore
	}
	return `Request failed with status ${response.status}`
}
