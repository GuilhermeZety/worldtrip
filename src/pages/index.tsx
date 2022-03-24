import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { SwiperSlide } from "swiper/react";

import Prismic from '@prismicio/client'
import { Header } from "../components/Header";
import { Slide } from "../components/Slide";
import { SlideImage } from "../components/SlideImage";
import { getPrismicClient } from "../services/prismic";

import Head from "next/head"

interface HomeSwiperProps{
    country: Country[]
}

interface Country{
    uid: string,
    title:string,
    subtitle: string,
    img: string,    
}

export default function Home({ country }: HomeSwiperProps){    
    return (
        <Flex
            direction='column'
        >
            <Head>
                <title>Worldtrip</title>
            </Head>

            <Header />

            {/*banner */}
            <Flex 
                h='23rem'
                minH='23rem'
                width='100%' 
                direction='column'
                position='relative'
            >
                 <Flex
                    backgroundImage={'url("/images/sky.jpg")'}
                    width='100%'
                    h='21rem'
                    backgroundSize='cover'
                    backgroundPosition='0% 25%'
                    paddingY='20'
                    justify='center'
                >
                    <Flex
                        w='100%'
                        maxW='1160px'
                        justify='space-between'
                    >
                        <Flex
                            direction='column'
                        >
                            <Text fontSize='4xl' color='gray.50' fontWeight='medium'>5 Continentes,<br /> infinitas possibilidades.</Text>
                            <Text color='gray.200' fontSize='xl' fontWeight='normal' >Chegou a hora de tirar do papel a viagem que<br /> você sempre sonhou. </Text>
                        </Flex>
                        <Image
                            src='/images/airplane.svg' 
                            alt='aviao' 
                            display={['none','none','Flex','Flex','Flex',]}
                            mt='auto'
                            width='40vw'
                            maxW='500px'
                        />
                    </Flex>
                </Flex>
            </Flex>

            <Flex width='100%' justify='center' >
                <Flex 
                    mt='20'
                    direction='row' 
                    w='100%'
                    maxW='1160px'
                    justify='space-between'
                    >
                    <Flex direction='column' align='center'>
                        <Image src='/images/vida_noturna.svg' alt='vida noturna' mb='6' maxW='85px'/>
                        <Text fontWeight='semibold' fontSize='2xl' >vida noturna</Text>
                    </Flex>

                    <Flex direction='column' align='center'>
                        <Image src='/images/praia.svg' alt='praia' mb='6' maxW='85px'/>
                        <Text fontWeight='semibold' fontSize='2xl' >praia</Text>
                    </Flex>

                    <Flex direction='column' align='center'>
                        <Image src='/images/moderno.svg' alt='moderno' mb='6' maxW='85px'/>
                        <Text fontWeight='semibold' fontSize='2xl' >moderno</Text>
                    </Flex>

                    <Flex direction='column' align='center'>
                        <Image src='/images/classico.svg' alt='clássico' mb='6' maxW='85px'/>
                        <Text fontWeight='semibold' fontSize='2xl' >clássico</Text>
                    </Flex>

                    <Flex direction='column' align='center'>
                        <Image src='/images/earth.svg' alt='e mais' mb='6' maxW='85px'/>
                        <Text fontWeight='semibold' fontSize='2xl' >e mais...</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex  
                width='90px' 
                mr='auto' 
                ml='auto' 
                minH='2px' 
                bg='gray.600'
                mt='4.9rem'
                mb='3.8rem'
            ></Flex> 

            <Text
                mr='auto' 
                ml='auto' 
                textAlign='center'
                fontWeight='medium'
                fontSize='4xl'
            >
                Vamos nessa?<br />
                Então escolha seu continente
            </Text>
            

            {/*swiper */}
            <Flex
                width='100%'
                justify='center'
            >
                <Box
                    mt='10'
                    w='100%'
                    maxW='1240px'
                    height='450px'
                    marginBottom='10'
                    >
                    <Slide>
                        
                        {country.map(country => (
                            <SwiperSlide key={country.uid}>
                                <SlideImage imageUrl={country.img} title={country.title} subtitle={country.subtitle} link={`/${country.uid}`}/>
                            </SwiperSlide>
                        ))}

                        <SwiperSlide>
                            <SlideImage imageUrl={"/africa.jpg"} title={"África"} subtitle={"O continente das diversidades"} link='/africa'/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideImage imageUrl={"/oceania.jpg"} title={"Oceania"} subtitle={"O menor continente"} link='/oceania'/>
                        </SwiperSlide>
                    </Slide>
                </Box>
            </Flex>
        </Flex>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    
    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'continent')
    ]);

    const results = response.results

    var countrys: Country[] = [];

    results.map(e => {
        var data: any = e.data;
        var country: Country = {
            uid: e.uid || '',
            title: data.continent[0].text,
            subtitle: data.resume[0].text,
            img: data.image_continent.url
        }
        
        countrys.push(country)
    })

    return {
        props: {
            country: countrys
        },
        revalidate: 60 * 60 * 24 // 24horas
    }
  };