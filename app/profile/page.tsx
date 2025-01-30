'use client'
import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// todo limits

interface Activity {
	id: number
	created: string
	name: string
	amount: number
}

export default function ProfilePage() {
	const [session, setSession] = useState(null)
	const [inputText, setInputText] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [activities, setActivities] = useState<Activity[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [isLoadingProfile, setIsLoadingProfile] = useState(true)
	const [isLoadingActivities, setIsLoadingActivities] = useState(true)

	const fetchMe = async (url: string) => {
		setIsLoadingProfile(true)
		const res = await fetch(url)
		const data = await res.json()
		setIsLoadingProfile(false)
		if (data) {
			setSession(data)
		}
		return data
	}

	const ProfileSkeleton = () => (
		<div className='animate-pulse'>
			<div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
				<div className='w-[150px] h-[150px] rounded-full bg-gray-200'></div>
				<div className='flex-grow w-full'>
					<div className='h-8 bg-gray-200 rounded w-1/3 mb-4'></div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
						<div className='h-24 bg-gray-200 rounded'></div>
						<div className='h-24 bg-gray-200 rounded'></div>
					</div>
					<div className='space-y-4'>
						<div className='h-10 bg-gray-200 rounded'></div>
						<div className='h-10 bg-gray-200 rounded'></div>
					</div>
				</div>
			</div>
		</div>
	)

	const ActivitiesSkeleton = () => (
		<div className='animate-pulse'>
			{/* <div className='h-8 bg-gray-200 rounded w-1/4 mb-4'></div> */}
			<div className='space-y-3'>
				{[1, 2, 3, 4, 5].map(i => (
					<div key={i} className='h-12 bg-gray-200 rounded'></div>
				))}
			</div>
		</div>
	)

	const fetchActivities = async (page: number) => {
		setIsLoadingActivities(true)
		const res = await fetch(`/api/activities?page=${page}`)
		const data = await res.json()
		setActivities(data.invoices)
		setTotalPages(data.totalPages)
		setIsLoadingActivities(false)
	}

	useEffect(() => {
		const getSession = async () => {
			const data = await fetchMe('/api/me')
			setSession(data)
			if (data) {
				fetchActivities(currentPage)
			}
		}
		getSession()
	}, [currentPage])

	let image = '/icon.png'
	let name = ''
	let email = ''
	let created_at = ''
	let rank = '-'
	let score = 0

	if (session) {
		image = session['image']
		name = session['name']
		email = session['email']
		created_at = session['created_at']
		rank = session['rank']
		score = session['score']
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (session && inputText && inputValue) {
			e.preventDefault()
			// Perform any necessary actions with the inputText and inputValue
			await fetch('/api/invoices', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({
					user_id: session['id'],
					name: inputText,
					amount: inputValue,
				}),
			})

			setInputText('')
			setInputValue('')
			fetchActivities(currentPage)
			fetchMe('/api/me')
		}
	}

	const handlePageChange = (page: string) => {
		if (page === 'prev') {
			setCurrentPage(currentPage - 1)
		} else if (page === 'next') {
			setCurrentPage(currentPage + 1)
		}
		fetchActivities(currentPage)
	}

	const renderActivities = () => {
		if (!activities) {
			return null
		}

		return activities.map(activity => (
			<tr
				key={activity.id}
				className='hover:bg-purple-50 transition-colors duration-200'
			>
				<td className='p-4'>
					{new Date(activity.created)
						.toLocaleString('sv-SE', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
						})
						.replace(' ', ' ')
						.replace(',', '')}
				</td>
				<td className='p-4 font-medium text-indigo-600'>{activity.name}</td>
				<td className='p-4 text-green-600 font-medium'>+{activity.amount}</td>
			</tr>
		))
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
					{isLoadingProfile ? (
						<>
							<ProfileSkeleton />
							<div className='mt-8 pt-8 border-t border-purple-100'>
								<ActivitiesSkeleton />
							</div>
						</>
					) : (
						<>
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
										{name}
									</h1>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
										<div className='stat-card p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-purple-100'>
											<h3 className='text-indigo-700 font-medium'>Rank</h3>
											<p className='text-2xl font-bold text-indigo-700'>
												{rank}
											</p>
										</div>
										<div className='stat-card p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-pink-100'>
											<h3 className='text-indigo-700 font-medium'>Score</h3>
											<p className='text-2xl font-bold text-indigo-700'>
												{score}
											</p>
										</div>
									</div>

									<div className='space-y-4 bg-white/50 p-6 rounded-lg'>
										<div className='flex gap-4 hover:bg-purple-50 p-2 rounded-lg transition-colors duration-200'>
											<span className='font-medium w-24 text-violet-700'>
												Email:
											</span>
											<span>{email}</span>
										</div>

										<div className='flex gap-4 hover:bg-purple-50 p-2 rounded-lg transition-colors duration-200'>
											<span className='font-medium w-24 text-violet-700'>
												Member since:
											</span>
											<span>{created_at}</span>
										</div>
									</div>
								</div>
							</div>
							<div className='mt-4'>
								<form onSubmit={handleSubmit}>
									<div className='flex gap-4'>
										<input
											type='text'
											className='p-2 rounded-lg border border-purple-200 flex-grow'
											placeholder='Enter Task'
											value={inputText}
											onChange={e => setInputText(e.target.value)}
										/>
										<input
											type='number'
											className='p-2 rounded-lg border border-purple-200 w-20'
											placeholder='Points'
											value={inputValue}
											onChange={e => {
												const points = parseInt(e.target.value)
												if (points >= 0 && points <= 100) {
													setInputValue(points.toString() as string)
												} else if (points < 0) {
													setInputValue('0')
												} else if (points > 100) {
													setInputValue('100')
												} else if (isNaN(points)) {
													setInputValue('')
												}
											}}
										/>
										<button
											type='submit'
											className='p-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600 transition-colors duration-200'
										>
											Submit
										</button>
									</div>
								</form>
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
										{isLoadingActivities ? (
											<tbody>
												<tr>
													<td colSpan={3}>
														<ActivitiesSkeleton />
													</td>
												</tr>
											</tbody>
										) : (
											<tbody>{renderActivities()}</tbody>
										)}
									</table>
								</div>
								{!isLoadingActivities && (
									<div className='relative flex justify-center items-center mt-4 px-8'>
										<div className='absolute left-8'>
											{currentPage > 1 && (
												<button
													className={`p-2 mx-1 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600 transition-colors duration-200 px-4 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all`}
													onClick={() => handlePageChange('prev')}
												>
													Previous
												</button>
											)}
										</div>
										<div className='flex items-center'>
											<span className='px-4 py-2 text-lg font-semibold text-violet-700 bg-violet-50 rounded-lg'>
												Page {currentPage} of {totalPages}
											</span>
										</div>
										<div className='absolute right-8'>
											{currentPage !== totalPages && (
												<button
													className={`p-2 mx-1 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600 transition-colors duration-200 px-4 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all`}
													onClick={() => handlePageChange('next')}
												>
													Next
												</button>
											)}
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</main>
	)
}
