import { sql } from '@vercel/postgres'
import type { User } from '@/app/lib/definitions'
import { getServerSession } from 'next-auth/next'
import { authConfig } from '@/configs/auth'

async function getUserID(email: string): Promise<User | undefined> {
	try {
		const userID = await sql<User>`SELECT id FROM users WHERE email=${email}`

		return userID.rows[0]
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to fetch user.')
	}
}

async function getUserInvoices(
	customerID: string,
	page: string
): Promise<User[]> {
	try {
		const offset = (Number(page) - 1) * 5
		const userInvoices =
			await sql<User>`SELECT * FROM invoices WHERE customer_id = ${customerID} ORDER BY created DESC LIMIT 5 OFFSET ${offset};`
		return userInvoices.rows
	} catch (error) {
		console.error('Failed to fetch user invoices:', error)
		throw new Error('Failed to fetch user invoices.')
	}
}
export async function GET(request: Request) {
	const url = new URL(request.url)
	const page = url.searchParams.get('page')

	const session = await getServerSession(authConfig)
	const email = session?.user?.email
	const user = await getUserID(email!)
	if (!user) {
		return new Response('User not found', { status: 404 })
	}
	const userInvoices = await getUserInvoices(user.id, page || '1')

	return new Response(JSON.stringify(userInvoices), { status: 200 })
}
