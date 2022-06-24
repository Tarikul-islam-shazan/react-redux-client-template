/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js'
    ],
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
            },
            colors: {
                transparent: 'transparent',
                brandColor: {
                    DEFAULT: '#FF8505',
                    secondary: '#462B97'
                },
                primaryColor: {
                    DEFAULT: '#282828',
                    shade: {
                        100: '#646464',
                        200: '#646464',
                        300: '#F5F5F5'
                    }
                },
                pending: {
                    DEFAULT: '#E0E0E1'
                },
                error: {
                    DEFAULT: '#DA336F'
                },
                success: {
                    DEFAULT: '#0ED2AF'
                },
                warning: {
                    DEFAULT: '#FFE100'
                }
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            }
        }
    },
    plugins: [require('tw-elements/dist/plugin')]
}
