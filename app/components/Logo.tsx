import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Style_Script } from "next/font/google";

const Script = Style_Script({
  variable: "--font-style-script",
  subsets: ["latin"],
  weight: ["400"],
});

const Logo = () => {
  return (
    <Box
      w={"10rem"}
      gap={".3rem"}
      mr={"1rem"}
      alignItems={"center"}
      display={"flex"}
      zIndex={"2000"}
    >
      <Image src={`/FreshLogo.png`} alt="" w={"3rem"} />
      <Text
        textAlign={"center"}
        fontSize={"1.1rem"}
        minW={"10ch"}
        fontWeight={"600"}
        color={"white"}
        className={`${Script.className}`}
      >
        Fresh Harvest <br /> Hub
      </Text>
    </Box>
  );
};

export default Logo;
