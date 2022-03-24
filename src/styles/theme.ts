import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: { 
            '600': '#47585B',
            '400': '#999999',
            '200': '#DADADA',
            '50' : '#F5F8FA',
        },
        yellow:{
            '500': '#FFBA08',
            '450': '#FFBA0850'
        },
        black:{
            '350': '#1B140150'
        }
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins',
    },
    styles: {
        global: {
            body: {
                bg: 'gray.50',
                color: 'gray.600'
            }
        },
    }
})