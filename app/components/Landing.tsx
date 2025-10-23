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
import useStoreQuery from "./store";
import Link from "next/link";
import { useSession } from "next-auth/react";



const Landing = () => {

  const { status } = useSession();
  const users = [1, 2, 3, 4, 5];
  let [userImageId, setUserImageId] = useState(1);
  const isOpen = useStoreQuery((s) => s.isOpen);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUserImageId(userImageId < 6 ? userImageId + 1 : (userImageId = 1));
    }, 3000);


    return () => {
      clearInterval(intervalId);
    };
  }, [userImageId]);
  const isFixed = useStoreQuery((s) => s.isFixed);
  return (
    <div className="cont">
      <Header />
      <Box
        mt={isFixed ? "15vh" : ""}
        overflowX={"hidden"}
        w={"100vw"}
        zIndex={"300"}
        h={"85vh"}
        bg={"#11312E"}
      >
        <Stack
          zIndex={"2000"}
          w={{ mdDown: "75%", mdTo2xl: "60%" }}
          p={{ mdDown: "1rem 1.5rem", mdTo2xl: "1rem 4rem" }}
          gap={"1.7rem"}
        >
          <Heading
            zIndex={"1500"}
            lineHeight={1}
            color={"white"}
            fontSize={{ lgTo2xl: "6xl", mdToLg: "5xl", mdDown: "3xl" }}
          >
            Farm-to-table made simple.
          </Heading>
          <Text
            zIndex={"1500"}
            color={"#98A2B3"}
            fontSize={{ smDown: "1rem", lgDown: "1.3rem", lgTo2xl: "1.3rem" }}
            maxWidth={{ mdDown: "30ch" }}
          >
            Trusted by the worlds best farms, grocers, and restaurants, Local
            Line is the leading e-commerce platform for buying & selling local
            food items.
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
                zIndex={"1500"}
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
              p={{ mdTo2xl: "1.5rem 1.3rem", mdDown: "1.2rem 1rem" }}
              fontSize={{ mdTo2xl: "xl" }}
              bg={"white"}
              color={"black"}
            >
              About Us
            </Button>
            {status === "unauthenticated" && (
              <Link href={"../register"}>
                <Button
                  bg={"#B37F37"}
                  p={{ mdTo2xl: "1.5rem 1.3rem", mdDown: "1.2rem 1rem" }}
                  zIndex={"2000"}
                  fontSize={{ mdTo2xl: "xl" }}
                >
                  Create Your Account
                </Button>
              </Link>
            )}
            {status === "authenticated" && (
              <Link href={'../home/farmer'}>
              <Button
                bg={"#B37F37"}
                p={{ mdTo2xl: "1.5rem 1.3rem", mdDown: "1.2rem 1rem" }}
                zIndex={"2000"}
                fontSize={{ mdTo2xl: "xl" }}
              >
                Start Selling
              </Button>
              </Link>
            )}
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
            zIndex={"5500"}
            src={`/user${userImageId}.jpg`}
            opacity={".9"}
          />
        </Stack>
        <Text
          bgBlendMode={"multiply"}
          bg="linear-gradient(to right, rgba(17, 49, 46, 1), rgba(17, 49, 46, .6), rgba(17, 49, 46, .1))"
          zIndex={"1400"}
          h={"100vh"}
          width={"60%"}
          position={"absolute"}
          top={0}
          right={0}
        ></Text>
        <Text
          zIndex={"3000"}
          position={"absolute"}
          h={"85vh"}
          width={"100%"}
          top={"15vh"}
          bg={"red"}
          right={"-100%"}
          animationName={isOpen ? "navOpen" : ""}
          animationDuration={".3s"}
          animationFillMode={"forwards"}
          animationTimingFunction={"linear"}
        ></Text>
      </Box>
    </div>
  );
};

export default Landing;
