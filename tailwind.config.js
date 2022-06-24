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
            },

            colors: ({ colors }) => ({
                transparent: 'transparent',
                brandColor: {
                    DEFAULT: '#04518C',
                    tint: {
                        100: '#24679A',
                        200: '#04518C',
                        300: '#568AB2',
                        400: '#88ADC9'
                    },
                    shade: {
                        100: '#011B2F',
                        200: '#073558'
                    }
                },
                primaryColor: {
                    DEFAULT: '#04518C',
                    tint: {
                        100: '#078FF7',
                        200: '#71BFFB',
                        300: '#B8DFFD',
                        400: '#DBEFFE',
                        500: '#F8FCFF'
                    },
                    shade: {
                        100: '#011B2F',
                        200: '#023154'
                    }
                },
                black: {
                    DEFAULT: '#111417',
                    title: '#121212',
                    maintext: '#545454',
                    tint: {
                        100: '#252B32',
                        200: '#39434D',
                        300: '#4D5A68',
                        400: '#617283',
                        500: '#788A9B',
                        600: '#93A1AF',
                        700: '#D0D3D6',
                        800: '#E8EFF3',
                        900: '#F8F8FA',
                        1000: '#F1F1F1'
                    }
                },
                white: {
                    DEFAULT: '#ffffff'
                },
                secondaryColor: {
                    DEFAULT: '#19B3BD',
                    tint: {
                        100: '#2ED8E3',
                        200: '#62E2EA',
                        300: '#B1F0F5',
                        400: '#E5FAFC'
                    },
                    shade: {
                        100: '#083C3F',
                        200: '#11777E'
                    }
                },
                goldenrod: {
                    secondary: '#FFC845',
                    tint: {
                        100: '#FFD36A',
                        200: '#FFDE8F',
                        300: '#FFEFC7',
                        400: '#FFFAEC'
                    },
                    shade: {
                        100: '#AD7A00',
                        200: '#FFB504'
                    }
                },
                error: {
                    DEFAULT: '#EF3A25'
                },
                success: {
                    DEFAULT: '#00A557'
                },
                warning: {
                    DEFAULT: '#F47721'
                }
            })
        }
    },
    plugins: []
}
