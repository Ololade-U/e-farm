"use client";
import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { IoIosMenu } from "react-icons/io";
import useStoreQuery from "./store";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
  const setOpen = useStoreQuery((s) => s.setOpen);
  const isOpen = useStoreQuery((s) => s.isOpen);
  const isFixed = useStoreQuery((s) => s.isFixed);
  const setFixed = useStoreQuery((s) => s.setFixed);
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
          <Box zIndex={"2000"}>
            <Image src={`/logo.webp`} alt="" w={"10rem"} />
          </Box>
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
            >
              Suppliers <LuChevronDown />
            </Text>
            <Text
              color={"white"}
              fontSize={{ xlTo2xl: "1.4rem", mdToLg: "1rem" }}
              display={"flex"}
              alignItems={"center"}
              gap={".4rem"}
            >
              Buyers <LuChevronDown />
            </Text>
            <Text
              color={"white"}
              fontSize={{ xlTo2xl: "1.4rem", mdToLg: "1rem" }}
              display={"flex"}
              alignItems={"center"}
              gap={".4rem"}
              zIndex={"2000"}
            >
              Resources <LuChevronDown />
            </Text>
          </Box>
        </Flex>
        <Flex
          display={{ mdDown: "none", mdTo2xl: "flex" }}
          gap={"1rem"}
          zIndex={"6500"}
        >
          <Button
            bg={"white"}
            color={"black"}
            p={".7rem 1rem"}
            fontSize={"1.1rem"}
            borderRadius={".5rem"}
          >
            Log in
          </Button>
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
