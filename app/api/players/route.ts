import Redis from 'ioredis'
import type { User } from '@/app/lib/definitions'
import { createClient } from '@vercel/postgres'

// const redis = new Redis()

async function getPlayers(): Promise<User[]> {
	// const cacheKey = 'userRanking'
	// const cachedData = await redis.get(cacheKey)

	// if (cachedData) {
	// 	return JSON.parse(cachedData)
	// }
	const client = createClient()
	await client.connect()
	try {
		const data =
			await client.sql<User>`SELECT name, score, rank FROM users ORDER BY score DESC;`
		// await redis.set(cacheKey, JSON.stringify(data.rows), 'EX', 3600)
		return data.rows
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to fetch user.')
	} finally {
		await client.end()
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
