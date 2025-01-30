import { sql } from '@vercel/postgres'
import type { User } from '@/app/lib/definitions'

async function createInvoice(
	// input
	customerID: string,
	name: string,
	amount: string
): Promise<User> {
	// id
	const { v4: uuidv4 } = require('uuid')
	const id = uuidv4()

	// add to db
	try {
		// const createdAt = dayjs().format('YYYY-MM-DD')
		const created = new Date().toISOString()
		const result = await sql<User>`
      INSERT INTO invoices (id, customer_id, amount, created, "name")
      VALUES (${id}, ${customerID}, ${amount}, ${created}, ${name})
    `
		return result.rows[0]
		// error
	} catch (error) {
		console.error('Failed to create user:', error)
		throw new Error('Failed to create user.')
	}
}

export async function POST(request: Request) {
	const body = await request.json()
	createInvoice(body['user_id'], body['name'], body['amount'])
	return new Response('Invoice created successfully', { status: 200 })
}
