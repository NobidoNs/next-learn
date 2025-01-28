export { default } from 'next-auth/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
	const isLoggedIn = !!req.cookies.has('next-auth.session-token')

	if (req.nextUrl.pathname.startsWith('/profile')) {
		if (!isLoggedIn) {
			return NextResponse.redirect(new URL('/login', req.url))
		}
	}
}
