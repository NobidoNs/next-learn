import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
	const cookieStore = cookies()
	await (await cookieStore).delete('session')

	return NextResponse.json(
		{ message: 'Signed out successfully' },
		{ status: 200 }
	)
}
