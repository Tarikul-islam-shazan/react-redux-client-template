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
                lg: '1080px',
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
                        200: '#E0E0E1',
                        300: '#F5F5F5'
                    }
                },
                white: {
                    DEFAULT: '#fff',
                    shade: {
                        100: '#F5F5F5'
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
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                btnHover: '0 10px 16px 0 rgb(0 0 0 / 0.3)',
                DEFAULT:
                    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
                none: 'none'
            }
        }
    },
    plugins: [require('tw-elements/dist/plugin')]
}
