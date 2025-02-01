import Redis from 'ioredis'
import type { User } from '@/app/lib/definitions'
import { db } from '@vercel/postgres'

// const redis = new Redis()

async function getPlayers(): Promise<User[]> {
	// const cacheKey = 'userRanking'
	// const cachedData = await redis.get(cacheKey)

	// if (cachedData) {
	// 	return JSON.parse(cachedData)
	// }

	try {
		const client = await db.connect()

		const data =
			await client.sql<User>`SELECT name, score, rank FROM users ORDER BY score DESC;`
		// await redis.set(cacheKey, JSON.stringify(data.rows), 'EX', 3600)
		return data.rows
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to fetch user.')
	}
}

export async function GET(request: Request) {
	const data = await getPlayers()
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
