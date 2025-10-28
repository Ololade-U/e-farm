import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { FaMinus } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import useStoreQuery from "./store";
import { Product } from "../hooks/useAllPosts";

interface Props {
  product: Product;
}

const CartCard = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const setQuantities = useStoreQuery((s)=> s.setQuantity);
  useEffect(() => { 
    setQuantities({productId: product.id, quantity: quantity});
  }, [quantity]);
  const removeCart = useStoreQuery((s) => s.removeCart);
  return (
    <Box
      display={"flex"}
      gap={"1rem"}
      w={"100%"}
      bg={"white"}
      p={"1rem"}
      borderRadius={".6rem"}
      mb={"1rem"}
      pos={"relative"}
    >
      <Box
        onClick={() => removeCart(product.id)}
        cursor={"pointer"}
        pos={"absolute"}
        right={".3rem"}
        top={".3rem"}
      >
        <IoClose />
      </Box>
      <CldImage
        src={product.img}
        alt={product.description}
        width={150}
        height={150}
      />
      <Stack gap={"1.5rem"} w={"100%"}>
        <Heading fontSize={"2xl"}>{product.description}</Heading>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            N{product.amount}
          </Text>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            bgColor={"#e3e3e3"}
            p={".2rem .5rem"}
            borderRadius={"1rem"}
            gap={"1rem"}
          >
            <FaMinus
              size={".7rem"}
              onClick={() => quantity > 0 && setQuantity(quantity - 1)}
            />
            <Text fontSize={".9rem"}>{quantity}</Text>
            <IoIosAdd size={"1rem"} onClick={() => setQuantity(quantity + 1)} />
          </Flex>
        </HStack>
      </Stack>
    </Box>
  );
};

export default CartCard;
