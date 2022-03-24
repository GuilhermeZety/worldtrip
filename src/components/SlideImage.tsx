import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface SlideImageProps{
    imageUrl: string,
    title: string,
    subtitle: string,
    link?: string
}

export function SlideImage({ imageUrl, title, subtitle, link = '' } : SlideImageProps){
    return (
        <Link href={link} passHref>
            <Box 
                backgroundImage={`url(${imageUrl})`}
                w='100%'
                h='450px'
                backgroundSize='cover'
                backgroundPosition='0% 25%'
                position='relative'
                cursor='pointer'
            >
                <Box w='100%' h='100%' bg='black.350' position='absolute' zIndex={1}></Box>
                <Flex
                    position='absolute'
                    align='center'
                    justify='center'
                    h='100%'
                    w='100%'
                    zIndex={2}
                    direction='column'
                >
                    <Text color='gray.50' fontSize='5xl' fontWeight='bold'>{title}</Text>
                    <Text color='gray.50' fontSize='2xl' fontWeight='bold'>{subtitle}</Text>
                </Flex>
            </Box>
        </Link>
    )
}