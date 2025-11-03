import {
  Box,
  HStack,
  Text,
  Image,
  Stack,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosAdd, IoIosArrowRoundBack } from "react-icons/io";
import { CldImage } from "next-cloudinary";
import { Product } from "../hooks/useAllPosts";
import { FaMinus, FaStar } from "react-icons/fa";
import useStoreQuery from "./store";
import useProductUploadDetail from "../hooks/useProductUploadDetail";

interface Props {
  product: Product | null;
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

const ProductDetail = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const setQuantities = useStoreQuery((s) => s.setQuantity);
  useEffect(() => {
    setQuantities({ productId: product && product.id, quantity: quantity });
  }, [quantity]);
  const formattedAmount = formatAmount(product?.amount!);
  const { uploader } = useProductUploadDetail(product?.userId!);
  const cart = useStoreQuery((s) => s.cart);
  const addToCart = useStoreQuery((s) => s.addToCart);
  const removeCart = useStoreQuery((s) => s.removeCart);
  return (
    <Box
      h={"83vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      overflow={"hidden"}
      gap={"1rem"}
    >
      <Stack
        alignContent={"flex-start"}
        alignItems={"center"}
        gap={".5rem"}
        w={"30%"}
        h={"100%"}
      >
        <HStack
          cursor={"pointer"}
          alignSelf={"flex-start"}
          gap={".2rem"}
          onClick={() => history.back()}
        >
          <IoIosArrowRoundBack size={"1.3rem"} />
          <Text>Back to Shop</Text>
        </HStack>
        <HStack
          h={"80%"}
          w={"100%"}
          justifyContent={"center"}
          borderRadius={".5rem"}
          bg={"#e3e3e3"}
        >
          {product?.img ? (
            <CldImage
              src={product.img}
              alt={product.description}
              height={600}
              width={300}
            />
          ) : (
            <Image
              src={"/not found.jpg"}
              pos={"relative"}
              objectFit={"contain"}
              w={"100%"}
              alt="not found"
            />
          )}
        </HStack>
      </Stack>
      <Box w={"30%"} h={"100%"}>
        <Stack
          h={"80%"}
          gap={"1rem"}
          borderRadius={".5rem"}
          bg={"#e3e3e3"}
          mt={"2rem"}
          p={"1rem"}
        >
          <Heading fontWeight={"700"}>{product?.description}</Heading>
          <Flex gap={".5rem"}>
            <FaStar fill="#B37F37" size={"1.2rem"} />
            <Text>3.9 {"(120 reviews)"}</Text>
          </Flex>
          <Flex flexDirection={"column"} gap={".5rem"} mb={".5rem"}>
            <Text fontSize={".8rem"}>Category</Text>
            <Text lineHeight={"0"} fontSize={"1.1rem"} fontWeight={"600"}>
              {product?.type}
            </Text>
          </Flex>
          <Flex flexDirection={"column"} mb={".5rem"} gap={".8rem"}>
            <Text fontSize={".8rem"}>Price</Text>
            <Text lineHeight={"0"} fontSize={"1.4rem"} fontWeight={"700"}>
              {formattedAmount}
            </Text>
          </Flex>
          <Flex flexDirection={"column"} gap={".4rem"}>
            <Text fontSize={".8rem"}>Store</Text>
            <Text
              lineHeight={".8"}
              fontWeight={"600"}
              maxW={"36ch"}
              fontSize={"1.2rem"}
            >
              {uploader?.storeName}
            </Text>
          </Flex>
          <HStack>
            <Text>Quantity</Text>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              bgColor={"#e3e3e3"}
              p={".2rem .5rem"}
              borderRadius={"1rem"}
              gap={"1rem"}
              border={"1px solid black"}
            >
              <FaMinus
                size={".7rem"}
                onClick={() => quantity > 0 && setQuantity(quantity - 1)}
                cursor={"pointer"}
              />
              <Text fontSize={".9rem"}>{quantity}</Text>
              <IoIosAdd
                size={"1rem"}
                onClick={() => setQuantity(quantity + 1)}
                cursor={"pointer"}
              />
            </Flex>
          </HStack>
          <Button
            bg={cart.includes(product?.id!) ? "#11312E" : "#B37F37"}
            w={"100%"}
            onClick={() =>
              cart.includes(product?.id!)
                ? removeCart(product?.id!)
                : addToCart(product?.id!)
            }
          >
            Add to Cart
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetail;
