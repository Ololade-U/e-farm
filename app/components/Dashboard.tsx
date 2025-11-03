import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdOutlineShowChart } from "react-icons/md";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa6";
import { CiMoneyBill } from "react-icons/ci";

const Dashboard = () => {
  return (
    <Box h={"78vh"} p={".5rem 2rem"}>
      <Flex alignItems={"center"} gap={".5rem"}>
        <Box p={".5rem"} borderRadius={"15%"} bg={"#FEF6D2"}>
          <MdOutlineShowChart fill="#FF9806" size={"1.2rem"} />
        </Box>
        <Text fontSize={"xl"} fontWeight={"700"}>
          Key Metrics
        </Text>
      </Flex>
      <HStack h={"100%"} flexWrap={"wrap"} justifyContent={"space-between"}>
        <Box
          h={"35%"}
          p={"1.5rem"}
          borderRadius={".5rem"}
          w={"23%"}
          bg={"rgba(17, 49, 21,.6)"}
        >
          <HStack justifyContent={"space-between"}>
            <Box p={".5rem"} borderRadius={"15%"} bg={"rgb(17, 49, 21)"}>
              <RiShoppingBag4Fill fill="white" size={"1.3rem"} />
            </Box>
            <Stack>
              <Text color={"rgb(17, 49, 21)"} fontWeight={"600"}>
                Total Products
              </Text>
              <Text
                textAlign={"end"}
                fontWeight={"700"}
                color={"rgb(17, 49, 21)"}
              >
                11
              </Text>
            </Stack>
          </HStack>
        </Box>
        <Box
          h={"35%"}
          p={"1.5rem"}
          borderRadius={".5rem"}
          w={"23%"}
          bg={"#E0FCEE"}
        >
          <HStack justifyContent={"space-between"}>
            <Box p={".5rem"} borderRadius={"15%"} bg={"#00BD7B"}>
              <LuBadgeDollarSign size={"1.3rem"} />
            </Box>
            <Stack>
              <Text color={"#5B927F"} fontWeight={"600"}>
                Total Sales
              </Text>
              <Text textAlign={"end"} fontWeight={"600"} color={"#0A4E48"}>
                6
              </Text>
            </Stack>
          </HStack>
        </Box>
        <Box
          h={"35%"}
          p={"1.5rem"}
          borderRadius={".5rem"}
          w={"23%"}
          bg={"rgba(17, 46, 49,.6)"}
        >
          <HStack justifyContent={"space-between"}>
            <Box p={".5rem"} borderRadius={"15%"} bg={"rgb(17, 46, 49)"}>
              <RiShoppingBag4Fill fill="white" size={"1.3rem"} />
            </Box>
            <Stack>
              <Text color={"rgb(17, 46, 49)"} fontWeight={"600"}>
                Active Sales
              </Text>
              <Text
                textAlign={"end"}
                fontWeight={"700"}
                color={"rgb(17, 46, 49)"}
              >
                0
              </Text>
            </Stack>
          </HStack>
        </Box>
        <Box
          h={"35%"}
          p={"1.5rem"}
          borderRadius={".5rem"}
          w={"23%"}
          bg={"#FEF6D2"}
        >
          <HStack justifyContent={"space-between"}>
            <Box p={".5rem"} borderRadius={"15%"} bg={"#FF9806"}>
              <FaRegClock fill="white" size={"1.3rem"} />
            </Box>
            <Stack>
              <Text color={"#CE8C41"} fontWeight={"600"}>
                Pending Delivery
              </Text>
              <Text textAlign={"end"} fontWeight={"700"} color={"#81330E"}>
                0
              </Text>
            </Stack>
          </HStack>
        </Box>
        <Box
          h={"35%"}
          p={"1.5rem"}
          borderRadius={".5rem"}
          w={"23%"}
          bg={"#E0FCEE"}
        >
          <HStack justifyContent={"space-between"}>
            <Box p={".5rem"} borderRadius={"15%"} bg={"#00BD7B"}>
              <CiMoneyBill fill="white" size={"1.3rem"} />
            </Box>
            <Stack>
              <Text color={"#5B927F"} fontWeight={"600"}>
                Total Revenue
              </Text>
              <Text textAlign={"end"} fontWeight={"700"} color={"#0A4E48"}>
                N254,000
              </Text>
            </Stack>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default Dashboard;
