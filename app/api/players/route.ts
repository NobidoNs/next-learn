import Redis from 'ioredis'
import type { User } from '@/app/lib/definitions'
// import { createClient } from '@vercel/postgres'
import { sql } from '@vercel/postgres'

async function getPlayers(): Promise<User[] | undefined> {
	// const client = createClient()
	console.log(1)
	// await client.connect()
	console.log(2)
	try {
		// const data =
		// await client.sql<User>`SELECT name, score, rank FROM users ORDER BY score DESC;`
		const data =
			await sql`SELECT name, score, rank FROM users ORDER BY score DESC;`
		console.log(3)
		return data.rows as User[]
	} catch (error) {
		console.error('Failed to fetch user:', error)
	} finally {
		// await client.end()
	}
}

export async function GET(request: Request) {
	const data = (await getPlayers()) || null
	console.log(4)
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
