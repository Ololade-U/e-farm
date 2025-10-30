"use client";
import { HStack, Box, Input, Stack, Image, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import useStoreQuery from "@/app/components/store";
import Link from "next/link";
import SignOutButton from "@/app/components/Logout";
import { useStore } from "zustand";
import Logo from "@/app/components/Logo";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const setSearchParam = useStoreQuery((s) => s.setSeacrhParam);
  const cart = useStoreQuery((s) => s.cart);
  return (
    <Stack overflowY={"hidden"} h={"100vh"}>
      <HStack
        justifyContent={"space-between"}
        h={"15vh"}
        alignItems={"center"}
        p={"0 1rem"}
        w={"100%"}
        borderBottom={"1px solid #e3e3e3"}
        bgColor={"#11312E"}
        pos={"fixed"}
        zIndex={"2000"}
      >
        <HStack alignItems={"center"}>
          <Box hideFrom={"md"}>
            <RxHamburgerMenu size={"1.5rem"} />
          </Box>
          <Link href={"/home/consumer"}>
            <Logo />
          </Link>
        </HStack>

        <form className="nav-form" action="">
          <Input
            p={"0 1rem"}
            color={"white"}
            border={"1px solid #e3e3e3"}
            borderRadius={".7rem"}
            placeholder="Search"
            onChange={(e) => setSearchParam(e.currentTarget.value)}
          />
        </form>
        <HStack
          pos={"relative"}
          mr={"2rem"}
          gap={"2.5rem"}
          alignItems={"center"}
        >
          <Box pos={"relative"}>
            <IoPerson fill="white" size={"1.5rem"} cursor={"pointer"} />
          </Box>
          <Link href={"./consumer/cart"}>
            <Box pos={"relative"} right={0}>
              <FaCartShopping fill="white" size={"1.5rem"} cursor={"pointer"} />
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
                {cart.length}
              </Text>
            </Box>
          </Link>
          <SignOutButton />
        </HStack>
      </HStack>
      <Box overflowY={"auto"} mt={"17vh"}>
        {children}
      </Box>
    </Stack>
  );
};

export default Layout;
