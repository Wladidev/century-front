/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#2471A3',
                    100: '#1F618D',
                    200: '#1A5276',
                },
                link: '#1F618D',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
