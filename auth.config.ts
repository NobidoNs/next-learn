import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	providers: [
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_CLIENT_ID!,
		// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		// }),
	],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const isOnProfile = nextUrl.pathname.startsWith('/profile')
			console.log(isLoggedIn)
			if (isOnProfile) {
				if (isLoggedIn) return true
				return false // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/profile', nextUrl))
			}
			return true
		},
	},
} satisfies NextAuthConfig
