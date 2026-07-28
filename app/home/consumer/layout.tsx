"use client";
import { HStack, Box, Drawer, Input, Portal, Stack, Image, Text } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import useStoreQuery from "@/app/components/store";
import Link from "next/link";
import SignOutButton from "@/app/components/Logout";
import Logo from "@/app/components/Logo";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const setSearchParam = useStoreQuery((s) => s.setSeacrhParam);
  const cart = useStoreQuery((s) => s.cart);
  const [navOpen, setNavOpen] = useState(false);
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
          <Box hideFrom={"md"} onClick={() => setNavOpen(true)}>
            <RxHamburgerMenu fill="white" color="white" size={"1.5rem"} cursor={"pointer"} />
          </Box>
          <Link href={"/home/consumer"}>
            <Logo />
          </Link>
        </HStack>

        <Box hideBelow={"md"}>
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
        </Box>
        <HStack
          pos={"relative"}
          mr={{ base: 0, md: "2rem" }}
          gap={{ base: "1.2rem", md: "2.5rem" }}
          alignItems={"center"}
        >
          <Box pos={"relative"} hideBelow={"md"}>
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
          <Box hideBelow={"md"}>
            <SignOutButton />
          </Box>
        </HStack>
      </HStack>
      <Drawer.Root
        open={navOpen}
        onOpenChange={(e) => setNavOpen(e.open)}
        placement="start"
        size="xs"
      >
        <Portal>
        <Drawer.Backdrop zIndex={"9999"} />
        <Drawer.Positioner zIndex={"9999"}>
          <Drawer.Content>
            <Drawer.Header borderBottom={"1px solid #e3e3e3"}>
              <Drawer.Title>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap={"1.5rem"}>
                <Input
                  p={"0 1rem"}
                  border={"1px solid #e3e3e3"}
                  borderRadius={".7rem"}
                  placeholder="Search"
                  onChange={(e) => setSearchParam(e.currentTarget.value)}
                />
                <HStack
                  cursor={"pointer"}
                  gap={".7rem"}
                  onClick={() => setNavOpen(false)}
                >
                  <IoPerson size={"1.3rem"} />
                  <Text>Profile</Text>
                </HStack>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer>
              <SignOutButton />
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
      <Box overflowY={"auto"} mt={"17vh"}>
        {children}
      </Box>
    </Stack>
  );
};

export default Layout;
