import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from '@/auth'

export default function ProfilePage() {
	return (
		<main className='flex min-h-screen flex-col p-6'>
			<div className='flex justify-between items-center mb-4'>
				<Link
					href='/'
					className='group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2.5}
						stroke='currentColor'
						className='w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
						/>
					</svg>
					<span className='font-semibold tracking-wide'>Back to Home</span>
				</Link>

				<button className='group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl hover:from-red-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-red-200 transform hover:-translate-y-0.5'>
					<span className='font-semibold tracking-wide'>Sign Out</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2.5}
						stroke='currentColor'
						className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
						/>
					</svg>
				</button>
			</div>

			<div className='container mx-auto max-w-6xl'>
				<div className='bg-white rounded-xl shadow-md p-8 mt-2'>
					<div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
						<div className='flex-shrink-0'>
							<Image
								src='/hero-mobile.png'
								width={150}
								height={150}
								className='rounded-full'
								alt='Profile picture'
							/>
						</div>

						<div className='flex-grow'>
							<h1 className={`${lusitana.className} text-3xl font-bold mb-4`}>
								John Doe
							</h1>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
								<div className='stat-card p-4 bg-gray-50 rounded-lg'>
									<h3 className='text-gray-500'>Rank</h3>
									<p className='text-2xl font-semibold'>#1</p>
								</div>
								<div className='stat-card p-4 bg-gray-50 rounded-lg'>
									<h3 className='text-gray-500'>Score</h3>
									<p className='text-2xl font-semibold'>1000</p>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='flex gap-4'>
									<span className='font-medium w-24'>Email:</span>
									<span>john.doe@example.com</span>
								</div>
								<div className='flex gap-4'>
									<span className='font-medium w-24'>Location:</span>
									<span>San Francisco</span>
								</div>
								<div className='flex gap-4'>
									<span className='font-medium w-24'>Member since:</span>
									<span>2023</span>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-8 pt-8 border-t'>
						<h2 className={`${lusitana.className} text-2xl font-bold mb-4`}>
							Recent Activity
						</h2>
						<table className='w-full'>
							<thead className='text-left'>
								<tr>
									<th className='pb-4'>Date</th>
									<th className='pb-4'>Activity</th>
									<th className='pb-4'>Points</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='py-2'>2023-12-01</td>
									<td>Won tournament</td>
									<td>+500</td>
								</tr>
								<tr>
									<td className='py-2'>2023-11-28</td>
									<td>Daily challenge completed</td>
									<td>+100</td>
								</tr>
								<tr>
									<td className='py-2'>2023-11-25</td>
									<td>Achievement unlocked</td>
									<td>+250</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	)
}
