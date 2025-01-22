import AcmeLogo from '@/app/ui/acme-logo'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image'

export default function Page() {
	return (
		<main className='flex min-h-screen flex-col p-6'>
			<div className='profile-icon'>
				<Image
					src='/hero-mobile.png'
					width={560}
					height={620}
					alt='Screenshot of the dashboard project showing mobile version'
					className='block md:hidden'
				/>
			</div>
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
