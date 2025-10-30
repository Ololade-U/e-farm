"use client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { IoIosMenu } from "react-icons/io";
import useStoreQuery from "./store";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignOutButton from "./Logout";
import Logo from "./Logo";

const Header = () => {
  const { status, data: session } = useSession();
  const setOpen = useStoreQuery((s) => s.setOpen);
  const isOpen = useStoreQuery((s) => s.isOpen);
  const isFixed = useStoreQuery((s) => s.isFixed);
  const setFixed = useStoreQuery((s) => s.setFixed);
  const [onSupply, setSupply] = useState(false);
  const [onBuy, setBuy] = useState(false);
  const [onResource, setResource] = useState(false);
  const SCROLL_THRESHOLD = 0.01;
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrolled = window.scrollY;

        if (scrolled > SCROLL_THRESHOLD) {
          setFixed(true);
        } else {
          setFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      bgColor={"#11312E"}
      w={"100%"}
      h={"15vh"}
      p={{ mdDown: "2rem 1.5rem", mdTo2xl: "1rem 4rem" }}
      zIndex={"2500"}
      pos={isFixed ? "fixed" : "static"}
      top={0}
    >
      <HStack justify={"space-between"}>
        <Flex gap={{ lgDown: "1rem", lgTo2xl: "2rem" }} alignItems={"center"}>
          <Link href={"/"}>
            <Logo />
          </Link>
          <Box
            zIndex={"2000"}
            display={{ mdDown: "none", mdTo2xl: "flex" }}
            gap={{ lgDown: ".7rem", lgTo2xl: "1.5rem" }}
          >
            <Text
              color={"white"}
              fontSize={{ xlTo2xl: "1.4rem", mdToLg: "1rem" }}
              display={"flex"}
              alignItems={"center"}
              gap={".4rem"}
              cursor={"pointer"}
              pos={"relative"}
              // mb={'1rem'}
              onMouseEnter={() => {
                setSupply(true);
                onBuy && setBuy(false);
                onResource && setResource(false);
              }}
            >
              Suppliers <LuChevronDown />
              <Box
                top={"2.5rem"}
                left={"-30%"}
                pos={"absolute"}
                w={"160%"}
                bg={"white"}
                color={"black"}
                fontSize={"1.2rem"}
                borderRadius={".2rem"}
                display={onSupply ? "block" : "none"}
                onMouseLeave={() => setSupply(false)}
              >
                <Stack>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    How it Works
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Join as a Farmer
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Pricing
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Logisstics Support
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    FAQs
                  </Text>
                </Stack>
              </Box>
            </Text>
            <Text
              color={"white"}
              fontSize={{ xlTo2xl: "1.4rem", mdToLg: "1rem" }}
              display={"flex"}
              alignItems={"center"}
              gap={".4rem"}
              cursor={"pointer"}
              pos={"relative"}
              onMouseEnter={() => {
                setBuy(true);
                onSupply && setSupply(false);
                onResource && setResource(false);
              }}
            >
              Buyers <LuChevronDown />
              <Box
                top={"2.5rem"}
                left={"-55%"}
                pos={"absolute"}
                w={"220%"}
                bg={"white"}
                color={"black"}
                fontSize={"1.2rem"}
                borderRadius={".2rem"}
                display={onBuy ? "block" : "none"}
                onMouseLeave={() => setBuy(false)}
              >
                <Stack>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    How it Works
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Shop Products
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Register
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Delivery & Payment
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    FAQs
                  </Text>
                </Stack>
              </Box>
            </Text>
            <Text
              color={"white"}
              fontSize={{ xlTo2xl: "1.4rem", mdToLg: "1rem" }}
              display={"flex"}
              alignItems={"center"}
              gap={".4rem"}
              zIndex={"2000"}
              cursor={"pointer"}
              pos={"relative"}
              onMouseEnter={() => {
                setResource(true);
                onBuy && setBuy(false);
                onSupply && setSupply(false);
              }}
            >
              Resources <LuChevronDown />
              <Box
                top={"2.5rem"}
                left={"-25%"}
                pos={"absolute"}
                w={"150%"}
                bg={"white"}
                color={"black"}
                fontSize={"1.2rem"}
                borderRadius={".2rem"}
                display={onResource ? "block" : "none"}
                onMouseLeave={() => setResource(false)}
              >
                <Stack>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Blogs
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Success Stories
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Market Insights
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Help Center
                  </Text>
                  <Text
                    p={".5rem 1rem"}
                    _hover={{ transform: "scale(1.02)", bg: "rgba(0,0,0,.1)" }}
                    transitionProperty={"transform, background"}
                    transitionDuration={".2s"}
                  >
                    Contact Us
                  </Text>
                </Stack>
              </Box>
            </Text>
          </Box>
        </Flex>
        {status === "unauthenticated" && (
          <Flex
            display={{ mdDown: "none", mdTo2xl: "flex" }}
            gap={"1rem"}
            zIndex={"6500"}
          >
            <Link href={"../login"}>
              <Button
                bg={"white"}
                color={"black"}
                p={".7rem 1rem"}
                fontSize={"1.1rem"}
                borderRadius={".5rem"}
              >
                Log in
              </Button>
            </Link>
            <Link href={"../register"}>
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
          </Flex>
        )}
        {status === "authenticated" && (
          <Text zIndex={"6500"} color={"white"}>
            {session.user?.name} <SignOutButton />
          </Text>
        )}
        <Flex display={{ mdDown: "flex", mdTo2xl: "none" }} zIndex={"1000"}>
          {isOpen ? (
            <IoClose
              onClick={() => setOpen(false)}
              fill="white"
              size={"2rem"}
            />
          ) : (
            <IoIosMenu
              onClick={() => setOpen(true)}
              fill="white"
              size={"2rem"}
            />
          )}
        </Flex>
      </HStack>
    </Box>
  );
};

export default Header;
