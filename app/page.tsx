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
			<tr key={index} className='bg-gray-50'>
				<td className='py-4 text-center text-black font-bold'>{player.rank}</td>
				<td className='py-4 px-4 text-center font-medium'>{player.name}</td>
				<td className='py-4 text-center text-blue-600 font-bold'>
					{player.score}
				</td>
			</tr>
		))
	}

	return (
		<main className='flex min-h-screen flex-col p-4'>
			<Link href='/profile'>
				<div className='w-16 h-16 rounded-full overflow-hidden shadow-lg mx-auto mt-4'>
					<Image
						src={image}
						width={800}
						height={800}
						alt='profile-icon'
						className='object-cover'
					/>
				</div>
			</Link>

			<div className='max-w-[800px] mx-auto my-8 p-4 bg-white bg-opacity-30 rounded-xl shadow-md w-full'>
				<div className='mb-8'>
					<h1 className='text-2xl font-bold text-center text-gray-800'>
						Leaderboard
					</h1>
				</div>

				<div className='overflow-x-auto'>
					<table className='w-full w-full bg-white bg-opacity-90 rounded-lg shadow-lg border-collapse overflow-hidden transition-transform duration-300 ease-in-out'>
						<thead>
							<tr className='bg-blue-600 text-white'>
								<th className='py-4 text-sm font-semibold w-1/4 rounded-tl-lg'>
									Rank
								</th>
								<th className='py-4 text-sm font-semibold w-2/4'>Player</th>
								<th className='py-4 text-sm font-semibold w-1/4 rounded-tr-lg'>
									Score
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{renderPlayers()}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	)
}
