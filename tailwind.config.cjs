/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			'mn': '575px',
			'sm': '640px',
			'md': '768px',
			'2md': '991px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1280px',
			'3xl': '1449px',
		},
		container: {
			center: 'true',
			padding: '16px'
		},
		extend: {
			fontFamily: {
				nunito: "'Nunito', sans-serif"
			},
			colors: {
				yellow: '#F4E041',
				lightyellow: '#FFE302',
				blue: '#00BDD3',
				grey: '#F8F8F8',
				darkgrey: '#B4B4B4',
				red: '#CB3D40'
			},
			// safelist: [
			//   'bg-1984',
			// ],

			backgroundImage: {
				hero: "url('../../public/img/hero.png')"
			}
		}
	},
	plugins: []
};
