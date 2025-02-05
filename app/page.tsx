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
		if (res.ok) {
			const text = await res.text()
			if (text) {
				return JSON.parse(text)
			}
		}
	}

	useEffect(() => {
		const getSession = async () => {
			const data = await fetchMe('/api/me')
			if (data) {
				setSession(data)
			}
		}

		const getPlayers = async () => {
			const data = await fetchMe('/api/players')
			if (data) {
				setPlayers(data)
			}
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
				<td className='mobile:py-3 mobile:text-center'>{player.rank}</td>
				<td className='mobile:py-3 mobile:px-2 mobile:text-center'>
					{player.name}
				</td>
				<td className='mobile:py-3 mobile:text-center'>{player.score}</td>
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
				<div className='text-2xl mobile:font-bold mobile:text-center mobile:pt-12 mobile:text-gray-800'>
					<h1>Leaderboard</h1>
				</div>

				<div className='mobile:text-l mobile:font-bold mobile:text-center mobile:pt-12 mobile:text-gray-800'>
					<table className='leaderboard-table'>
						<thead>
							<tr className='mobile:bg-blue-600 mobile:text-white'>
								<th className='mobile:py-3 mobile:text-sm mobile:font-medium mobile:w-1/4'>
									Rank
								</th>
								<th className='mobile:py-3 mobile:text-sm mobile:font-medium mobile:w-2/4 mobile:text-center'>
									Player
								</th>
								<th className='mobile:py-3 mobile:text-sm mobile:font-medium mobile:w-1/4'>
									Score
								</th>
							</tr>
						</thead>
						<tbody>{renderPlayers()}</tbody>
					</table>
				</div>
			</div>
		</main>
	)
}
