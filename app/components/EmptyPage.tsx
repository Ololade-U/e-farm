import { Box, Text } from "@chakra-ui/react";
import React from "react";

const EmptyPage = () => {
  return (
    <div>
      <Box
        height={"60vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text fontSize={"2xl"}>No results found for your search.</Text>
      </Box>
    </div>
  );
};

export default EmptyPage;
