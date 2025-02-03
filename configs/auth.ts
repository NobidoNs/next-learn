import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import type { User } from '@/app/lib/definitions'
import { db } from '@vercel/postgres'

async function getUser(email: string): Promise<User | undefined> {
	if (!email) return undefined
	try {
		const client = await db.connect()
		const user =
			await client.sql<User>`SELECT * FROM users WHERE email=${email}`
		return user.rows[0]
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to fetch user.')
	}
}

async function createUser(
	// input
	email: string,
	password: string,
	name?: string,
	image?: string
): Promise<User> {
	// id
	const { v4: uuidv4 } = require('uuid')
	const id = uuidv4()
	// password
	let hashedPassword = null
	if (password) {
		const salt = await bcrypt.genSalt(10)
		hashedPassword = await bcrypt.hash(password, salt)
	} else {
		hashedPassword = 'supersecret'
	}
	// add to db
	try {
		const client = await db.connect()
		const result = await client.sql<User>`
      INSERT INTO users (id, email, password, name, created, image, rank, score)
      VALUES (${id}, ${email}, ${hashedPassword}, ${
			name || null
		}, ${Date.now()}, ${image}, ${'-'}, ${0})
      RETURNING *
    `
		return result.rows[0]
		// error
	} catch (error) {
		console.error('Failed to create user:', error)
		throw new Error('Failed to create user.')
	}
}

export const authConfig: AuthOptions = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async session({ session, user, token }) {
			const userData = await getUser(session.user?.email!)
			if (userData) {
				console.log('userFound', userData)
			} else {
				console.log('createUser', session.user?.email)
				await createUser(
					session.user?.email!,
					token.password as string,
					session.user?.name as string,
					session.user?.image as string
				)
			}
			return session
		},
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		Credentials({
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
