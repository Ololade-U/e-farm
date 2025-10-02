"use client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { LuChevronDown } from "react-icons/lu";

const Header = () => {
  return (
    <Box bgColor={"#11312E"} w={"100%"} h={'15vh'} p={"1.5rem 4rem"}>
      <HStack justify={"space-between"}>
        <Flex gap={"2rem"} alignItems={'center'}>
          <Box>
            <Image src={`/logo.webp`} alt="" w={"10rem"} />
          </Box>
          <Box display={"flex"} gap={"1.5rem"}>
            <Text color={"white"} fontSize={'1.4rem'} display={'flex'} alignItems={'center'} gap={'.4rem'}>Suppliers <LuChevronDown /></Text>
            <Text color={"white"} fontSize={'1.4rem'} display={'flex'} alignItems={'center'} gap={'.4rem'}>Buyers <LuChevronDown /></Text>
            <Text color={"white"} fontSize={'1.4rem'} display={'flex'} alignItems={'center'} gap={'.4rem'}>Resources <LuChevronDown /></Text>
          </Box>
        </Flex>
        <Flex gap={"1rem"}>
          <Button
            bg={"white"}
            color={"black"}
            p={".7rem 1rem"}
            fontSize={"1.1rem"}
            borderRadius={".5rem"}
          >
            Log in
          </Button>
          <Button
            bg={"#B37F37"}
            color={"white"}
            p={".7rem 1rem"}
            fontSize={"1.1rem"}
            borderRadius={".5rem"}
          >
            Sign Up
          </Button>
        </Flex>
      </HStack>
    </Box>
  );
};

export default Header;
