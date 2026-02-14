export type Prize = {
	id: string
	label: string
}

export type SpinResponse = {
	spinId: string
	stopAngle: number
}

export type RevealResponse = {
	prize: Prize
}

export type ClaimResponse = {
	ok: true
}
