import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <Flex
      height={{ base: "auto", md: "85vh" }}
      flexDirection={{ base: "column", md: "row" }}
      justify={"center"}
      align={"center"}
      gap={{ base: "2.5rem", md: "2rem" }}
      p={{ base: "2rem 1.5rem", md: "2rem 0" }}
    >
        <Stack w={{ base: "100%", md: "40%" }} maxW={{ base: "26rem", md: "none" }} alignItems={'center'} gap={'1rem'}>
            <Image src={'/farmer_reg.webp'} w={'80%'} alt='an image'/>
            <Link href={"../register/farmer"}>
            <Button
              bg={"#B37F37"}
              color={"white"}
              p={".7rem 1rem"}
              fontSize={"1.1rem"}
              borderRadius={".5rem"}
            >
              Sign Up
            </Button>
          </Link>
          <Heading textAlign={'center'} maxW={'20ch'} color={'#11312E'} fontSize={{ base: '2xl', md: '4xl' }}>Fresh Harvest Hub for Farms and Food Hubs</Heading>
          <Text textAlign={'center'} fontSize={{ base: 'sm', md: 'md' }}>Start using Fresh Harvest Hub for your sales channels</Text>
        </Stack>
        <Stack w={{ base: "100%", md: "40%" }} maxW={{ base: "26rem", md: "none" }} alignItems={'center'} gap={'1rem'}>
            <Image src={'/farmer_reg.webp'} w={'80%'} alt='an image'/>
            <Link href={"../register/consumer"}>
            <Button
              border={'1px solid #11312E'}
              bg={'white'}
              color={"#11312E"}
              p={".7rem 1rem"}
              fontSize={"1.1rem"}
              borderRadius={".5rem"}
            >
              Sign Up
            </Button>
          </Link>
          <Heading textAlign={'center'} color={'#11312E'} fontSize={{ base: '2xl', md: '4xl' }}>Fresh Harvest Hub for Buyers</Heading>
          <Text textAlign={'center'} fontSize={{ base: 'sm', md: 'md' }}>Start using Fresh Harvest Hub for your local food sourcing.</Text>
        </Stack>
    </Flex>
  )
}

export default Register