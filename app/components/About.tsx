import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <Box id="About" p={{ base: "2rem 1.25rem", md: "2rem 4rem" }} bg={"rgba(17, 49, 46, .1)"}>
      <Heading
        color={"#11312E"}
        fontSize={{ base: "2xl", md: "4xl" }}
        mb={{ base: "2rem", md: "4rem" }}
        textAlign={"center"}
        fontWeight={'bolder'}
      >
        About Us
      </Heading>
      <HStack
        flexDirection={{ base: "column", md: "row" }}
        justify={"center"}
        gap={{ base: "1.5rem", md: "4.5rem" }}
        mb={{ base: "2.5rem", md: "5rem" }}
      >
        <Box w={{ base: "100%", md: "40%" }}>
          <Heading color={"#11312E"} fontSize={{ base: "xl", md: "3xl" }} mb={"1rem"}>
            Bringing the Farm to Your Table
          </Heading>
          <Text fontSize={{ base: "sm", md: "lg" }}>
            Local Line is a farm-to-table commerce platform for local food
            buyers and suppliers. Our e-commerce platform helps farms,
            producers, food hubs and farmers markets sell to their customers and
            manage all their operations in one place. Our sourcing platform
            helps grocers, restaurants, and distributors buy direct from local
            farms.
          </Text>
        </Box>
        <Image alt="an image" src={"/about.jpg"} w={{ base: "100%", md: "35%" }} />
      </HStack>

      <HStack
        flexDirection={{ base: "column", md: "row" }}
        justify={"center"}
        gap={{ base: "1.5rem", md: "4.5rem" }}
        mb={{ base: "2.5rem", md: "5rem" }}
      >
        <Image alt="an image" src={"/about2.jpg"} w={{ base: "100%", md: "35%" }} />
        <Box w={{ base: "100%", md: "40%" }}>
          <Heading color={"#11312E"} fontSize={{ base: "xl", md: "3xl" }} mb={"1rem"}>
            Unbeatable Freshness and Quality
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Local Line is built for food suppliers doing direct marketing. If
            you're building direct relationships with your customers, whether
            it's using retail or wholesale channels, Local Line is a fit for
            you.
          </Text>
        </Box>
      </HStack>

      <HStack
        flexDirection={{ base: "column", md: "row" }}
        justify={"center"}
        gap={{ base: "1.5rem", md: "4.5rem" }}
      >
        <Box w={{ base: "100%", md: "40%" }}>
          <Heading color={"#11312E"} fontSize={{ base: "xl", md: "3xl" }} mb={"1rem"}>
            A Fairer Share
          </Heading>
          <Text fontSize={{ base: "sm", md: "lg" }}>
            We ensure our farmers keep the majority of the profit—significantly more than they earn through conventional routes. This empowers them to invest back into sustainable practices, their land, and their families. Buying from us directly fuels the growth of local agriculture.
          </Text>
        </Box>
        <Image alt="an image" src={"/about3.jpg"} w={{ base: "100%", md: "35%" }} />
      </HStack>
    </Box>
  );
};

export default About;
