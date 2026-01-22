import localFont from 'next/font/local'

export const robotoFlex = localFont({
    src: [
        {
            path: '../assets/fonts/roboto-flex/RobotoFlex-Variable.ttf',
            weight: '100 1000',
            style: 'normal',
        },
    ],
    variable: '--font-roboto-flex',
    display: 'swap',
})