import { HStack, Box, Input, Stack, Image, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <Stack>
      <HStack
        justifyContent={"space-between"}
        h={"15vh"}
        alignItems={"center"}
        p={"0 1rem"}
        w={"100%"}
        borderBottom={"1px solid #e3e3e3"}
        bgColor={"#11312E"}
      >
        <HStack alignItems={"center"}>
          <Box hideFrom={"md"}>
            <RxHamburgerMenu size={"1.5rem"} />
          </Box>
          <Box zIndex={"2000"}>
            <Image src={`/logo.webp`} alt="" w={"10rem"} />
          </Box>
        </HStack>

        <form className="nav-form" action="">
          <Input
            p={"0 1rem"}
            color={"white"}
            border={"1px solid #e3e3e3"}
            borderRadius={".7rem"}
            placeholder="Search"
          />
        </form>
        <HStack
          pos={"relative"}
          mr={"2rem"}
          gap={"2.5rem"}
          alignItems={"center"}
        >
          <Box pos={"relative"}>
            <IoPerson fill="white" size={"1.5rem"} cursor={'pointer'}/>
          </Box>
          <Box pos={"relative"} right={0}>
            <FaCartShopping fill="white" size={"1.5rem"} cursor={'pointer'}/>
            <Text
              fontSize={".4rem"}
              p={".2rem .4rem"}
              borderRadius={"50%"}
              bgColor={"black"}
              pos={"absolute"}
              right={"-.3rem"}
              top={"-.5rem"}
              color={"white"}
            >
              0
            </Text>
          </Box>
        </HStack>
      </HStack>
      <Box>{children}</Box>
    </Stack>
  );
};

export default layout;
