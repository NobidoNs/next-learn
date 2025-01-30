'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Player {
	rank: number
	name: string
	score: number
}

export default function Page() {
	const [session, setSession] = useState(null)
	const [players, setPlayers] = useState<Player[]>([])

	const fetchMe = async (url: string) => {
		const res = await fetch(url)
		const data = await res.json()
		return data
	}

	useEffect(() => {
		const getSession = async () => {
			const data = await fetchMe('/api/me')
			setSession(data)
		}

		const getPlayers = async () => {
			const data = await fetchMe('/api/players')
			setPlayers(data)
		}

		getSession()
		getPlayers()
	}, [])

	let image = '/icon.png'
	if (session) {
		image = session['image']
	}

	const renderPlayers = () => {
		return players.map((player, index) => (
			<tr key={index}>
				<td>{player.rank}</td>
				<td>{player.name}</td>
				<td>{player.score}</td>
			</tr>
		))
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
					<tbody>{renderPlayers()}</tbody>
				</table>
			</div>
		</main>
	)
}
