"use client"

import { Search } from 'lucide-react'

type SearchBarProps = {
	placeholder: string
	buttonLabel: string
}

export const SearchBar = ({ placeholder, buttonLabel }: SearchBarProps) => (
	<div className="mx-auto -mt-8 w-full max-w-5xl rounded-2xl bg-white p-4 shadow-md md:p-6">
		<div className="grid grid-cols-1 gap-3 md:grid-cols-4">
			<select className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400">
				<option>Location</option>
				<option>New York</option>
				<option>Los Angeles</option>
				<option>Chicago</option>
			</select>
			<select className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400">
				<option>Pick-up date</option>
			</select>
			<select className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400">
				<option>Return date</option>
			</select>
			<button
				type="button"
				className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
			>
				<Search className="size-4" />
				{buttonLabel}
			</button>
		</div>
	</div>
)
