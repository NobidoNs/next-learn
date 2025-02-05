import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			animation: {
				'gradient-xy': 'gradient-xy 15s ease infinite',
			},
			gridTemplateColumns: {
				'13': 'repeat(13, minmax(0, 1fr))',
			},
			colors: {
				blue: {
					400: '#2589FE',
					500: '#0070F3',
					600: '#2F6FEB',
				},
			},
			screens: {
				mobile: { max: '767px' }, // Определяем мобильный размер
			},
		},
		keyframes: {
			shimmer: {
				'100%': {
					transform: 'translateX(100%)',
				},
			},
			'gradient-xy': {
				'0%, 100%': {
					'background-size': '400% 400%',
					'background-position': 'left center',
				},
				'50%': {
					'background-size': '200% 200%',
					'background-position': 'right center',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
export default config
