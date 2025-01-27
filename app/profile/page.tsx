'use client'
import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function ProfilePage() {
	const session = useSession()
	let image = session.data?.user?.image
	if (!image) {
		image = '/icon.png'
	}
	return (
		<main className='flex min-h-screen flex-col p-6'>
			<div className='flex justify-between items-center mb-4'>
				<Link
					href='/'
					className='group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-500 text-white rounded-xl hover:from-violet-700 hover:to-indigo-600 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5'
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

				<button className='group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl hover:from-pink-600 hover:to-rose-500 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5'>
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
				<div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 mt-0 border border-purple-100'>
					<div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
						<div className='flex-shrink-0'>
							<Image
								src={image}
								width={150}
								height={150}
								className='rounded-full ring-4 ring-purple-200 shadow-lg transform hover:scale-105 transition-transform duration-300'
								alt='Profile picture'
							/>
						</div>

						<div className='flex-grow'>
							<h1
								className={`${lusitana.className} text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text`}
							>
								John Doe
							</h1>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
								<div className='stat-card p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-purple-100'>
									<h3 className='text-indigo-700 font-medium'>Rank</h3>
									<p className='text-2xl font-bold text-indigo-700'>#1</p>
								</div>
								<div className='stat-card p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-pink-100'>
									<h3 className='text-indigo-700 font-medium'>Score</h3>
									<p className='text-2xl font-bold text-indigo-700'>1000</p>
								</div>
							</div>

							<div className='space-y-4 bg-white/50 p-6 rounded-lg'>
								<div className='flex gap-4 hover:bg-purple-50 p-2 rounded-lg transition-colors duration-200'>
									<span className='font-medium w-24 text-violet-700'>
										Email:
									</span>
									<span>john.doe@example.com</span>
								</div>
								<div className='flex gap-4 hover:bg-purple-50 p-2 rounded-lg transition-colors duration-200'>
									<span className='font-medium w-24 text-violet-700'>
										Location:
									</span>
									<span>San Francisco</span>
								</div>
								<div className='flex gap-4 hover:bg-purple-50 p-2 rounded-lg transition-colors duration-200'>
									<span className='font-medium w-24 text-violet-700'>
										Member since:
									</span>
									<span>2023</span>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-8 pt-8 border-t border-purple-100'>
						<h2
							className={`${lusitana.className} text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text`}
						>
							Recent Activity
						</h2>
						<div className='overflow-hidden rounded-xl border border-purple-100'>
							<table className='w-full'>
								<thead className='text-left bg-gradient-to-r from-violet-50 to-indigo-50'>
									<tr>
										<th className='p-4 text-violet-700'>Date</th>
										<th className='p-4 text-violet-700'>Activity</th>
										<th className='p-4 text-violet-700'>Points</th>
									</tr>
								</thead>
								<tbody>
									<tr className='hover:bg-purple-50 transition-colors duration-200'>
										<td className='p-4'>2023-12-01</td>
										<td className='p-4 font-medium text-indigo-600'>
											Won tournament
										</td>
										<td className='p-4 text-green-600 font-medium'>+500</td>
									</tr>
									<tr className='hover:bg-purple-50 transition-colors duration-200'>
										<td className='p-4'>2023-11-28</td>
										<td className='p-4 font-medium text-indigo-600'>
											Daily challenge completed
										</td>
										<td className='p-4 text-green-600 font-medium'>+100</td>
									</tr>
									<tr className='hover:bg-purple-50 transition-colors duration-200'>
										<td className='p-4'>2023-11-25</td>
										<td className='p-4 font-medium text-indigo-600'>
											Achievement unlocked
										</td>
										<td className='p-4 text-green-600 font-medium'>+250</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
