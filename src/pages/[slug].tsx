import { Box, Button, Flex, Icon, Link, Popover,
     PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent,
      PopoverHeader, PopoverTrigger, Text, VStack, SimpleGrid  } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Header } from "../components/Header";
import { getPrismicClient } from "../services/prismic";
import { FiInfo } from 'react-icons/fi'
import { City } from "../components/City";
import Head from "next/head"

interface ContinentProps{
    continent: {
        slug: string,
        continent: string,
        image_continent: string,
        description: string, 
        number_countrys: number,
        languages: number,
        cities_better_100: number,
        cities: City[],
    }
}

interface City{
    image_city: string,
    country_flag: string,
    country: string,
    city: string
}


export default function Continent({continent}: ContinentProps){
    return (
        <Flex
            direction='column'
        >
            <Head>
                <title>{continent.continent} | Worldtrip</title>
            </Head>

            <Header showBack={true}/>

            {/*banner*/}
            <Flex
                height='500px'
            >
                <Flex 
                    backgroundImage={`url(${continent.image_continent})`}
                    w='100%'
                    backgroundSize='cover'
                    backgroundPosition='0% 25%'
                    position='relative'
                    justify='center'
                >
                    <Box w='100%' h='100%' bg='black.350' position='absolute' zIndex={1}></Box>
                    <Flex
                        position='absolute'
                        justify='end'
                        h='100%'
                        w='100%'
                        maxW='1160px'
                        zIndex={2}
                        direction='column'
                        pb='3.6rem'
                    >
                        <Text color='gray.50' fontSize='5xl' fontWeight='bold'>{continent.continent}</Text>
                    </Flex>
                </Flex>
            </Flex>
            
            <Flex
                w='100%'
                justify='center'
                mt='20'
            >
                <Flex
                    maxW='1160px'
                    justify='space-between'
                >
                    <Box
                        width='60%'
                    >
                        <Text lineHeight='2' fontSize='2xl'>{continent.description}</Text>

                    </Box>
                    <Flex
                        width='35%'
                        justify='space-between'
                    >
                        <VStack spacing='1' fontWeight='semibold'>
                            <Text  color='yellow.500' fontSize='5xl'>{continent.number_countrys}</Text>
                            <Text fontSize='2xl'>paises</Text>
                        </VStack>

                        <VStack spacing='1' fontWeight='semibold'>
                            <Text  color='yellow.500' fontSize='5xl'>{continent.languages}</Text>
                            <Text fontSize='2xl'>línguas</Text>
                        </VStack>

                        <VStack spacing='1' >
                            <Text color='yellow.500' fontSize='5xl' fontWeight='semibold'>{continent.cities_better_100}</Text>
                            <Flex
                                align='center'
                                justify='center'
                                gap='1'
                            >
                                <Text fontSize='2xl' fontWeight='semibold'>cidades +100</Text>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button padding='0' minW='auto' h='auto' bg='transparent'><Icon as={FiInfo} color='gray.400' fontSize='lg'></Icon></Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader fontWeight='semibold'>As 100 cidades mais populares do mundo!</PopoverHeader>
                                        <PopoverBody>
                                            Este continente atualmente possui {continent.cities_better_100} cidades
                                            entre as mais visitadas no mundo segundo <Link target='_blank' href="https://www.visualcapitalist.com/the-100-most-popular-city-destinations/" color='yellow.500' textDecoration='underline'>Este artigo</Link>!
                                        </PopoverBody>
                                    </PopoverContent>
                                    </Popover>
                            </Flex>
                            
                        </VStack>
                    </Flex>
                </Flex>
            </Flex>

            <Flex
                w='100%'
                align='center'
                mt='20'
                direction='column'
                mb='35px'
            >
                <Flex
                    width='100%'
                    maxW='1160px'
                >
                    <Text fontSize='4xl' fontWeight='medium'>Cidades +100</Text>
                </Flex>

                <SimpleGrid 
                    mt='10'
                    columns={4}
                    width='100%'
                    maxW='1160px'
                    spacing={10}
                    flexWrap='wrap'
                >

                    {continent.cities.map(city => (
                        <City key={city.city} city={city.city} imgCity={city.image_city} country={city.country} imgCountry={city.country_flag}  />
                    ))}
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}


export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const { slug } = params!;

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('continent', String(slug), {})
    
    var data = response.data as any;
    // console.log(data)

    var cities = [] as any[];
    
    (data.city as []).map((e: any) => {
        cities.push(
            {
                image_city: e.imagecity.url,
                country_flag: e.countryflag.url,
                country: e.pais[0].text,
                city: e.city1[0].text,
            }
        )
    })
    return {
        props: {
            continent:{
                slug,
                continent: data.continent[0].text,
                image_continent: data.image_continent.url,
                description: data.description[0].text,
                number_countrys: data.number_countrys,
                languages: data.languages,
                cities_better_100: data.cities_better_100,
                cities: cities
            }
        }
    } 

}
 