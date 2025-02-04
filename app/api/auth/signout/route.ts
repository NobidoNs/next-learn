import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
	cookies().delete('session')

	return NextResponse.json(
		{ message: 'Signed out successfully' },
		{ status: 200 }
	)
}
function cookies() {
	throw new Error('Function not implemented.')
}
