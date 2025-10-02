"use client";
import React, { useEffect, useState } from "react";
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
  let [userImageId, setUserImageId] = useState(1);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUserImageId(userImageId < 6 ? userImageId + 1 : (userImageId = 1));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userImageId]);
  return (
    <div>
      <Header />
      <Box zIndex={"300"} h={"85vh"} bg={"#11312E"}>
        <Stack
          zIndex={"2000"}
          w={{ mdDown: "75%", mdTo2xl: "60%" }}
          p={{ mdDown: "1rem 1.5rem", mdTo2xl: "1rem 4rem" }}
          gap={"1.7rem"}
        >
          <Heading
            zIndex={"2000"}
            lineHeight={1}
            color={"white"}
            fontSize={{ lgTo2xl: "6xl", mdToLg: "5xl", mdDown: "3xl" }}
          >
            Farm-to-table made simple.
          </Heading>
          <Text
            zIndex={"2000"}
            color={"#98A2B3"}
            fontSize={{ smDown:'1rem', lgDown: "1.2rem", lgTo2xl: "1.3rem" }}
          >
            Trusted by the worlds best farms, grocers, and restaurants, Local
            Line is the leading e-commerce platform for buying & selling local
            food.
          </Text>
          <Flex pl={"1rem"} alignItems={"center"}>
            {users.map((el) => (
              <Image
                key={el}
                border={"1.5px solid white"}
                w={{ smDown: "2rem", smTo2xl: "3rem" }}
                h={{ smDown: "2rem", smTo2xl: "3rem" }}
                pos={"relative"}
                left={`-${el}rem`}
                borderRadius={"50%"}
                src={`/user${el}.jpg`}
                alt="User"
                zIndex={"2000"}
              />
            ))}
            <Box
              pos={"relative"}
              left={{ mdDown: "-4rem", mdTo2xl: "-3.5rem" }}
              display={"flex"}
              gap={".3rem"}
              zIndex={"2000"}
            >
              {users.map((el) => (
                <FaStar key={el} size={"1.2rem"} fill="#FEC84B" />
              ))}
            </Box>
          </Flex>
          <HStack>
            <Button
              p={{mdTo2xl: "1.5rem 1.3rem",  mdDown: "1.2rem 1rem"}}
              fontSize={{ mdTo2xl: "xl" }}
              bg={"white"}
              color={"black"}
            >
              About Us
            </Button>
            <Button
              bg={"#B37F37"}
              p={{mdTo2xl: "1.5rem 1.3rem",  mdDown: "1.2rem 1rem"}}
              zIndex={"2000"}
              fontSize={{ mdTo2xl: "xl" }}
            >
              Create Your Account
            </Button>
          </HStack>
        </Stack>
        <Stack
          zIndex={0}
          width={"60%"}
          pos={"absolute"}
          top={0}
          height={"100vh"}
          right={0}
        >
          <Image
            transitionProperty={`${userImageId}`}
            transitionDuration={".8"}
            transitionTimingFunction={"linear"}
            h={"100vh"}
            src={`/user${userImageId}.jpg`}
            opacity={".9"}
          />
        </Stack>
        <Text
          bgBlendMode={"multiply"}
          bg="linear-gradient(to right, rgba(17, 49, 46, 1), rgba(17, 49, 46, .6), rgba(17, 49, 46, .1))"
          zIndex={"900"}
          h={"100vh"}
          width={"60%"}
          position={"absolute"}
          top={0}
          right={0}
        ></Text>
      </Box>
    </div>
  );
};

export default Landing;
