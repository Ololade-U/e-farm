import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <Box p={"2rem 4rem"} bg={"rgba(17, 49, 46, .1)"}>
      <Heading
        color={"#11312E"}
        fontSize={"4xl"}
        mb={"4rem"}
        textAlign={"center"}
        fontWeight={'bolder'}
      >
        About Us
      </Heading>
      <HStack justify={"center"} gap={"4.5rem"} mb={"5rem"}>
        <Box w={"40%"}>
          <Heading color={"#11312E"} fontSize={"3xl"} mb={"1rem"}>
            Bringing the Farm to Your Table
          </Heading>
          <Text fontSize={"lg"}>
            Local Line is a farm-to-table commerce platform for local food
            buyers and suppliers. Our e-commerce platform helps farms,
            producers, food hubs and farmers markets sell to their customers and
            manage all their operations in one place. Our sourcing platform
            helps grocers, restaurants, and distributors buy direct from local
            farms.
          </Text>
        </Box>
        <Image src={"/about.jpg"} w={"35%"} />
      </HStack>

      <HStack justify={"center"} gap={"4.5rem"} mb={"5rem"}>
        <Image src={"/about2.jpg"} w={"35%"} />
        <Box w={"40%"}>
          <Heading color={"#11312E"} fontSize={"3xl"} mb={"1rem"}>
            Unbeatable Freshness and Quality
          </Heading>
          <Text>
            Local Line is built for food suppliers doing direct marketing. If
            you're building direct relationships with your customers, whether
            it's using retail or wholesale channels, Local Line is a fit for
            you.
          </Text>
        </Box>
      </HStack>

      <HStack justify={"center"} gap={"4.5rem"}>
        <Box w={"40%"}>
          <Heading color={"#11312E"} fontSize={"3xl"} mb={"1rem"}>
            A Fairer Share
          </Heading>
          <Text fontSize={"lg"}>
            We ensure our farmers keep the majority of the profit—significantly more than they earn through conventional routes. This empowers them to invest back into sustainable practices, their land, and their families. Buying from us directly fuels the growth of local agriculture.
          </Text>
        </Box>
        <Image src={"/about3.jpg"} w={"35%"} />
      </HStack>
    </Box>
  );
};

export default About;
