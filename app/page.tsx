'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Page() {
	const session = useSession()
	let image = session.data?.user?.image
	if (!image) {
		image = '/icon.png'
	}
	return (
		<main className='flex min-h-screen flex-col p-6'>
			<Link href='/profile'>
				<div className='profile-icon'>
					<Image
						src={image}
						width={800}
						height={800}
						alt='Screenshot of the dashboard project showing mobile version'
					/>
				</div>
			</Link>

			<div className='container'>
				<h1>Leaderboard</h1>
				<table className='leaderboard-table'>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Player</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Player 1</td>
							<td>1000</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Player 2</td>
							<td>850</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Player 3</td>
							<td>720</td>
						</tr>
					</tbody>
				</table>
			</div>
		</main>
	)
}
