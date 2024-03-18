/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'minefield': "url('../public/minesweeperbackground.jpeg')",
            },
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
                '30': 'repeat(30, minmax(0, 1fr))',
            },
            gridTemplateRows: {
                '16': 'repeat(16, minmax(0, 1fr))',
            },
        },
    },
    plugins: [],
}
  