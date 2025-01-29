import { authConfig } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { sql } from '@vercel/postgres'
import type { User } from '@/app/lib/definitions'

async function getUser(
	email: string | null | undefined
): Promise<User | undefined> {
	try {
		const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
		return user.rows[0]
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to fetch user.')
	}
}

export async function GET(request: Request) {
	const session = await getServerSession(authConfig)
	const data = await getUser(session?.user?.email)

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
