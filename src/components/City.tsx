import { Box, Flex, Text, VStack } from "@chakra-ui/react";

interface CityProps{
    city: string,
    imgCity: string,
    country: string,
    imgCountry: string
}

export function City({ city, country, imgCity, imgCountry}: CityProps){
    return (
        <Flex
            w='256px'
            minW='256px'
            direction='column'
        >
            <Box
                backgroundImage={`url(${imgCity})`}
                w='100%'
                height='170px'
                backgroundSize='cover'
                backgroundPosition='0% 25%'
                borderTopRadius='8px'
            ></Box>
            <Flex
                maxW='100%'
                height='106px'
                justify='space-between'
                background='white'
                align='center'
                paddingX='24px'
                borderBottom='1px solid'
                borderX='1px solid'
                borderColor='yellow.450'
                borderBottomRadius='8px'
            >
                <Flex
                    direction='column'
                    gridGap='12px'
                >
                    <Text fontSize='xl' fontWeight='semibold'>{city}</Text>
                    <Text color='gray.400' fontSize='md'>{country}</Text>
                </Flex>
                
                <Flex>
                    <Box
                        backgroundImage={`url(${imgCountry})`}
                        w='30px'
                        height='30px'
                        backgroundSize='cover'
                        backgroundPosition='50% 0%'
                        borderRadius='100%'
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}