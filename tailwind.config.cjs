// eslint-disable-next-line @typescript-eslint/no-var-requires
const { neutral } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',
    content: ['src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                gray: neutral,
            },
            fontFamily: {
                sans: ['var(--spline-sans-mono)', 'var(--noto-hk)', 'var(--noto-sc)'],
            },
            typography: theme => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.700'),
                        'h1,h2,h3,h4,h5,h6': {
                            color: theme('colors.gray.900'),
                        },
                        h1: {
                            fontSize: '36px',
                        },
                        p: {
                            color: theme('colors.gray.700'),
                            fontSize: '21px',
                        },
                        strong: {
                            color: theme('colors.gray.600'),
                        },
                        a: {
                            color: theme('colors.blue.600'),
                        },
                        li: {
                            fontSize: '21px',
                        },
                        blockquote: {
                            borderLeftColor: theme('colors.gray.300'),
                        },
                    },
                },
                dark: {
                    css: {
                        color: theme('colors.gray.300'),
                        'h1,h2,h3,h4,h5,h6': {
                            color: theme('colors.gray.300'),
                        },
                        h1: {
                            color: theme('colors.gray.300'),
                        },
                        p: {
                            color: theme('colors.gray.400'),
                        },
                        strong: {
                            color: theme('colors.gray.500'),
                        },
                        a: {
                            color: theme('colors.blue.300'),
                        },
                        blockquote: {
                            borderLeftColor: theme('colors.gray.700'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
