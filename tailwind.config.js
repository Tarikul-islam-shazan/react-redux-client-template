/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '360px',
                sm: '640px',
                md: '768px',
                'custom-md': '769px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1366px',
                '3xl': '1440px',
                '4xl': '1536px',
                '5xl': '1920px'
            }
        }
    },
    plugins: []
}
