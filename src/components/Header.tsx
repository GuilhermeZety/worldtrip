import { Image, Flex, Box, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import { AiOutlineLeft } from 'react-icons/ai'
interface HeaderProps{
    showBack?: boolean
}

export function Header({ showBack = false }: HeaderProps){
    return (
        <Flex w='100%' justify='center'>
            <Flex height='100px' width='100%' maxW='1160px' align='center' justify='space-between'>
                {showBack ? 
                    <Link href={'/'} passHref>
                        <Box cursor={'pointer'} mt='2'>
                            <Icon as={AiOutlineLeft} fontSize='xl'></Icon>
                        </Box>
                    </Link> 
                    :
                    <Box></Box>
                }
                
                <Image src='/images/logo.svg' alt='logo'></Image>

                <Box></Box>
            </Flex>
        </Flex>
    )
}