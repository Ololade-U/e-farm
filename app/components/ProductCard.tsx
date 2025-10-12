
import {
  Card,
  Flex,
  Box,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

interface Product {
  id: string;
  description: string;
  type: string;
  amount: number;
  quantity: number;
  status: string;
  img: string;
}

interface Prop {
  product: Product;
}

const ProductCard = ({ product }: Prop) => {
  return (
    <>
      <Card.Root borderRadius={"1rem"} overflow={"hidden"} p={"1rem"}>
        {product.img ? (
          <CldImage src={product.img} alt={product.description} height={300} width={400}/>
        ) : (
          <Image
            src={"/not found.jpg"}
            pos={"relative"}
            objectFit={"contain"}
            w={"100%"}
          />
        )}
        <Flex justify={"flex-end"} alignItems={"flex-start"}>
          <Box
            cursor={"pointer"}
            // bgColor={{ _dark: "blue.900", _light: "#e3e3e3" }}
            // p={".8rem .8rem"}
            top={"-1rem"}
            right={".5rem"}
            position={"relative"}
            title="Add to watchlist"
          >
            <BsCartPlus/>
          </Box>
        </Flex>
        <Card.Body p={0}>
            <Heading fontSize={"1xl"}>
              {product.description}
            </Heading>
            <Text fontSize={'3xl'} fontWeight={'bold'}>{product.amount}</Text>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default ProductCard;
