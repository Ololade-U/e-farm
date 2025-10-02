import React from "react";
import Header from "./header";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const Landing = () => {
  const users = [1, 2, 3, 4, 5];
  return (
    <div>
      <Header />
      <Box h={"85vh"} bg={"#11312E"}>
        <Stack w={"50%"} p={"1rem 4rem"} gap={"1.7rem"}>
          <Heading lineHeight={1} color={"white"} fontSize={"6xl"}>
            Farm-to-table made simple.
          </Heading>
          <Text color={"#98A2B3"} fontSize={"1.3rem"}>
            Trusted by the worlds best farms, grocers, and restaurants, Local
            Line is the leading e-commerce platform for buying & selling local
            food.
          </Text>
          {/* <Image src={`/user1.jpg`}/> */}
          <Flex pl={"1rem"} alignItems={'center'}>
            {users.map((el) => (
              <Image
                key={el}
                border={"1.5px solid white"}
                w={"3rem"}
                h={"3rem"}
                pos={"relative"}
                left={`-${el}rem`}
                borderRadius={"50%"}
                src={`/user${el}.jpg`}
                alt="User"
              />
            ))}
            <Box pos={'relative'} left={'-3.5rem'} display={'flex'} gap={'.5rem'}>
            {users.map((el) => (
              <FaStar key={el} size={'1.3rem'} fill="#FEC84B" />
            ))}
            </Box>
          </Flex>
          <HStack>
            <Button
              p={"1.5rem 1.3rem"}
              fontSize={"xl"}
              bg={"white"}
              color={"black"}
            >
              About Us
            </Button>
            <Button bg={"#B37F37"} p={"1.5rem 1.3rem"} fontSize={"xl"}>
              Create Your Account
            </Button>
          </HStack>
        </Stack>
      </Box>
    </div>
  );
};

export default Landing;
