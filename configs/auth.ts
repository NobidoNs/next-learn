import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import type { User } from '@/app/lib/definitions'
import { sql } from '@vercel/postgres'

async function getUser(email: string): Promise<User | undefined> {
	try {
		const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
		return user.rows[0]
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to fetch user.')
	}
}

export const authConfig: AuthOptions = {
	pages: {
		signIn: '/login',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Email',
					required: true,
				},
				password: { label: 'Password', type: 'password', required: true },
			},
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials)

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data

					const user = await getUser(email)
					if (!user) return null

					const passwordsMatch = await bcrypt.compare(password, user.password)
					if (passwordsMatch) return user
				}

				console.log('Invalid credentials')
				return null
			},
		}),
	],
}
