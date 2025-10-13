import { Box} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props{
  children : ReactNode
}

const EmptyPage = ({children}:Props) => {
  return (
    <div>
      <Box
        height={"60vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box fontSize={"2xl"}>{children}</Box>
      </Box>
    </div>
  );
};

export default EmptyPage;
